import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import TodoStats from './components/TodoStats';
import SearchBar from './components/SearchBar';
import SmartSections from './components/SmartSections';
import UndoNotification from './components/UndoNotification';
import UpdateNotification from './components/UpdateNotification';
import useTodos from './hooks/useTodos';
import { getFilteredAndSortedTodos } from './utils/todoUtils';

function App() {
  const { todos, loading, error, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingTodo, setEditingTodo] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [deletedTodo, setDeletedTodo] = useState(null);
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle PWA install prompt and updates
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show install button or banner
      const installButton = document.createElement('button');
      installButton.textContent = 'Install App';
      installButton.className = 'btn btn-primary install-prompt';
      
      installButton.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response to the install prompt: ${outcome}`);
          deferredPrompt = null;
          installButton.remove();
        }
      });
      
      document.body.appendChild(installButton);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleAddTodo = async (todoData) => {
    try {
      await addTodo(todoData);
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (todoData) => {
    if (!editingTodo) return;
    
    try {
      await updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find(t => t.id === id);
    if (!todoToDelete) return;

    try {
      await deleteTodo(id);
      setDeletedTodo(todoToDelete);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleUndoDelete = async () => {
    if (!deletedTodo) return;
    
    try {
      // Create a new todo with the same data but ensure it's treated as new
      const restoredTodo = {
        ...deletedTodo,
        // Remove the original ID to let the system generate a new one
        // This prevents conflicts if the same ID was reused
      };
      delete restoredTodo.id;
      
      await addTodo(restoredTodo);
      setDeletedTodo(null);
    } catch (err) {
      console.error('Failed to restore todo:', err);
    }
  };

  const handleDismissUndo = () => {
    setDeletedTodo(null);
  };

  const handleUpdateApp = () => {
    window.location.reload();
    setShowUpdateNotification(false);
  };

  const handleDismissUpdate = () => {
    setShowUpdateNotification(false);
  };

  const filteredAndSortedTodos = getFilteredAndSortedTodos(
    todos, 
    filter, 
    sortBy, 
    sortOrder, 
    searchTerm
  );

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Todo PWA</h1>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Todo PWA</h1>
        <p>Manage your tasks offline and online</p>
        {!isOnline && (
          <div style={{ 
            background: '#f59e0b', 
            color: 'white', 
            padding: '0.5rem', 
            borderRadius: '0.5rem', 
            marginTop: '1rem' 
          }}>
            You're offline - changes will sync when you're back online
          </div>
        )}
      </div>

      {error && (
        <div style={{ 
          background: '#dc2626', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          marginBottom: '1rem' 
        }}>
          {error}
        </div>
      )}

      <TodoStats todos={todos} />

      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TodoForm
        onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
        editingTodo={editingTodo}
        onCancel={handleCancelEdit}
      />

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === 'sections' ? (
        <SmartSections
          todos={filteredAndSortedTodos}
          onToggle={toggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      ) : (
        <TodoList
          todos={filteredAndSortedTodos}
          onToggle={toggleTodo}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
        />
      )}

      <UndoNotification
        deletedTodo={deletedTodo}
        onUndo={handleUndoDelete}
        onDismiss={handleDismissUndo}
      />

      <UpdateNotification
        showUpdate={showUpdateNotification}
        onUpdate={handleUpdateApp}
        onDismiss={handleDismissUpdate}
      />
    </div>
  );
}

export default App;