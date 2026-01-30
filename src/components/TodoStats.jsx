import React from 'react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const overdueTodos = todos.filter(todo => {
    if (!todo.deadline || todo.completed) return false;
    const today = new Date();
    const deadline = new Date(todo.deadline);
    return deadline < today;
  }).length;

  return (
    <div className="stats">
      <div className="stat-item">
        <h4>{totalTodos}</h4>
        <p>Total Tasks</p>
      </div>
      <div className="stat-item">
        <h4>{activeTodos}</h4>
        <p>Active</p>
      </div>
      <div className="stat-item">
        <h4>{completedTodos}</h4>
        <p>Completed</p>
      </div>
      <div className="stat-item">
        <h4>{overdueTodos}</h4>
        <p>Overdue</p>
      </div>
    </div>
  );
};

export default TodoStats;