import { useState, useEffect, useCallback } from 'react';
import { createStorageService } from '../services/storage';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storage] = useState(() => createStorageService());

  // Load todos from storage on mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        await storage.init();
        const storedTodos = await storage.getAllTodos();
        setTodos(storedTodos);
        setError(null);
      } catch (err) {
        console.error('Error loading todos:', err);
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [storage]);

  const addTodo = useCallback(async (todoData) => {
    try {
      const newTodo = {
        id: todoData.id || Date.now().toString(), // Use provided ID or generate new one
        ...todoData,
        completed: todoData.completed || false,
        createdAt: todoData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await storage.addTodo(newTodo);
      setTodos(prev => [...prev, newTodo]);
      setError(null);
      return newTodo;
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo');
      throw err;
    }
  }, [storage]);

  const updateTodo = useCallback(async (id, updates) => {
    try {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) throw new Error('Todo not found');

      const updatedTodo = {
        ...todos[todoIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      await storage.updateTodo(updatedTodo);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      setError(null);
      return updatedTodo;
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
      throw err;
    }
  }, [todos, storage]);

  const deleteTodo = useCallback(async (id) => {
    try {
      await storage.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
      throw err;
    }
  }, [storage]);

  const toggleTodo = useCallback(async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) throw new Error('Todo not found');

      await updateTodo(id, { completed: !todo.completed });
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError('Failed to toggle todo');
    }
  }, [todos, updateTodo]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
  };
};

export default useTodos;