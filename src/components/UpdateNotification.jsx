import React from 'react';

const UpdateNotification = ({ showUpdate, onUpdate, onDismiss }) => {
  if (!showUpdate) return null;

  return (
    <div className="update-notification">
      <div className="update-content">
        <div className="update-info">
          <strong>Update Available</strong>
          <p>A new version of the app is ready to install.</p>
        </div>
        <div className="update-actions">
          <button 
            onClick={onUpdate}
            className="btn btn-primary btn-small"
          >
            Update Now
          </button>
          <button 
            onClick={onDismiss}
            className="btn btn-secondary btn-small"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotification;