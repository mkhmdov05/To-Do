import React, { useState, useEffect } from 'react';

const TodoForm = ({ onSubmit, editingTodo, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    deadline: ''
  });

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        title: editingTodo.title,
        priority: editingTodo.priority,
        deadline: editingTodo.deadline || ''
      });
    } else {
      setFormData({
        title: '',
        priority: 'medium',
        deadline: ''
      });
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const todoData = {
      ...formData,
      title: formData.title.trim(),
      deadline: formData.deadline || null
    };

    onSubmit(todoData);
    
    if (!editingTodo) {
      setFormData({
        title: '',
        priority: 'medium',
        deadline: ''
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your task..."
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="form-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      <div className="form-row">
        <button type="submit" className="btn btn-primary">
          {editingTodo ? 'Update Task' : 'Add Task'}
        </button>
        {editingTodo && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;