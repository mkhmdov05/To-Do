import React, { useEffect } from 'react';

const UndoNotification = ({ deletedTodo, onUndo, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!deletedTodo) return null;

  return (
    <div className="undo-notification">
      <div className="undo-content">
        <span className="undo-message">
          Deleted "{deletedTodo.title}"
        </span>
        <div className="undo-actions">
          <button 
            onClick={onUndo}
            className="btn btn-success btn-small"
          >
            Undo
          </button>
          <button 
            onClick={onDismiss}
            className="btn btn-secondary btn-small"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default UndoNotification;