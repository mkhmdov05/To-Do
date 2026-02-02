import React from 'react';
import TodoItem from './TodoItem';

const SmartSections = ({ todos, onToggle, onEdit, onDelete }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const categorizedTodos = {
    overdue: [],
    today: [],
    upcoming: [],
    noDeadline: []
  };

  todos.forEach(todo => {
    if (!todo.deadline) {
      categorizedTodos.noDeadline.push(todo);
      return;
    }

    const deadline = new Date(todo.deadline);
    deadline.setHours(0, 0, 0, 0);

    if (deadline < today && !todo.completed) {
      categorizedTodos.overdue.push(todo);
    } else if (deadline.getTime() === today.getTime()) {
      categorizedTodos.today.push(todo);
    } else if (deadline >= tomorrow) {
      categorizedTodos.upcoming.push(todo);
    }
  });

  const renderSection = (title, todos, className = '') => {
    if (todos.length === 0) return null;

    return (
      <div className={`smart-section ${className}`}>
        <h3 className="section-title">
          {title} ({todos.length})
        </h3>
        <div className="section-todos">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    );
  };

  const hasAnyTodos = Object.values(categorizedTodos).some(arr => arr.length > 0);

  if (!hasAnyTodos) {
    return (
      <div className="todo-list">
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Add a new task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="smart-sections">
      {renderSection('Overdue', categorizedTodos.overdue, 'overdue-section')}
      {renderSection('Today', categorizedTodos.today, 'today-section')}
      {renderSection('Upcoming', categorizedTodos.upcoming, 'upcoming-section')}
      {renderSection('No Deadline', categorizedTodos.noDeadline, 'no-deadline-section')}
    </div>
  );
};

export default SmartSections;