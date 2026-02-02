// Utility functions for todo operations

export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const searchTodos = (todos, searchTerm) => {
  if (!searchTerm.trim()) return todos;
  
  const term = searchTerm.toLowerCase();
  return todos.filter(todo => 
    todo.title.toLowerCase().includes(term) ||
    (todo.notes && todo.notes.toLowerCase().includes(term))
  );
};

export const sortTodos = (todos, sortBy, sortOrder = 'asc') => {
  const sortedTodos = [...todos].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'title':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      case 'priority':
        // Priority order: high > medium > low
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[a.priority];
        bValue = priorityOrder[b.priority];
        break;
      case 'deadline':
        // Handle null deadlines (put them at the end)
        if (!a.deadline && !b.deadline) return 0;
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        aValue = new Date(a.deadline);
        bValue = new Date(b.deadline);
        break;
      case 'createdAt':
      default:
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sortedTodos;
};

export const getFilteredAndSortedTodos = (todos, filter, sortBy, sortOrder, searchTerm = '') => {
  let filtered = filterTodos(todos, filter);
  filtered = searchTodos(filtered, searchTerm);
  return sortTodos(filtered, sortBy, sortOrder);
};