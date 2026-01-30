import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today && !todo.completed;
  };

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority}`;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      <div className="todo-content">
        <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </h3>
        <div className="todo-meta">
          <span className={getPriorityClass(todo.priority)}>
            {todo.priority}
          </span>
          {todo.deadline && (
            <span className={isOverdue(todo.deadline) ? 'text-red-600' : ''}>
              Due: {formatDate(todo.deadline)}
              {isOverdue(todo.deadline) && ' (Overdue)'}
            </span>
          )}
          <span>
            Created: {formatDate(todo.createdAt)}
          </span>
        </div>
      </div>
      
      <div className="todo-actions">
        <button
          onClick={() => onEdit(todo)}
          className="btn btn-secondary btn-small"
          disabled={todo.completed}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn btn-danger btn-small"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;