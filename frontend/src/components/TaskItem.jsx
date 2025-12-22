import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div>
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            {task.subject && (
              <span className="subject">{task.subject}</span>
            )}
            <span>Due: {formatDate(task.due_date)}</span>
            <span>Status: {task.completed ? 'Completed' : 'Pending'}</span>
          </div>
        </div>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-actions">
        <button
          className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
          onClick={() => onToggleComplete(task.id, !task.completed)}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

