import React from 'react';

const TodoFilters = ({ 
  filter, 
  onFilterChange, 
  sortBy, 
  onSortChange, 
  sortOrder, 
  onSortOrderChange,
  viewMode,
  onViewModeChange
}) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { key: 'createdAt', label: 'Date Created' },
    { key: 'deadline', label: 'Deadline' },
    { key: 'priority', label: 'Priority' },
    { key: 'title', label: 'Title' }
  ];

  return (
    <div className="filters">
      <div className="filter-row">
        <div className="filter-buttons">
          {filters.map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => onFilterChange(filterOption.key)}
              className={`filter-btn ${filter === filterOption.key ? 'active' : ''}`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
        
        <div className="view-toggle">
          <button
            onClick={() => onViewModeChange('list')}
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            title="List View"
          >
            ☰
          </button>
          <button
            onClick={() => onViewModeChange('sections')}
            className={`view-btn ${viewMode === 'sections' ? 'active' : ''}`}
            title="Smart Sections"
          >
            📋
          </button>
        </div>
      </div>
      
      {viewMode === 'list' && (
        <div className="sort-controls">
          <div className="form-group">
            <label htmlFor="sortBy">Sort by:</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="form-select"
            >
              {sortOptions.map(option => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="sortOrder">Order:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => onSortOrderChange(e.target.value)}
              className="form-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoFilters;