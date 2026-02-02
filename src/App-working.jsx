import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Sample Task', completed: false, priority: 'medium', createdAt: new Date().toISOString() }
  ]);
  const [newTask, setNewTask] = useState('');

  const addTodo = () => {
    if (newTask.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString()
      }]);
      setNewTask('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #2563eb, #3b82f6)', 
        color: 'white', 
        padding: '2rem', 
        borderRadius: '1rem',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '2.5rem' }}>Todo PWA</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Manage your tasks offline and online</p>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '0.75rem', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter your task..."
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Add Task
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '0.75rem', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {todos.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
            <h3>No tasks found</h3>
            <p>Add a new task to get started!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              style={{
                padding: '1.5rem',
                borderBottom: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ width: '1.25rem', height: '1.25rem' }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{
                  margin: '0 0 0.25rem 0',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#6b7280' : '#000'
                }}>
                  {todo.title}
                </h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  Priority: {todo.priority} | Created: {new Date(todo.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        textAlign: 'center', 
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        <p>✅ Basic Todo App Working!</p>
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;