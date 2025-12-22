import React, { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="task-list">
      <h2>Your Tasks</h2>
      
      <div className="filter-controls">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>
            {filter === 'all' 
              ? 'Create your first study task to get started!' 
              : `No ${filter} tasks at the moment.`}
          </p>
        </div>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;

