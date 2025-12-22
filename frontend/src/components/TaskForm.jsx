import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    due_date: '',
    completed: false
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        subject: task.subject || '',
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
        completed: task.completed || false
      });
    } else {
      setFormData({
        title: '',
        description: '',
        subject: '',
        due_date: '',
        completed: false
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter task title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Math, Science"
            />
          </div>

          <div className="form-group">
            <label htmlFor="due_date">Due Date</label>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <label htmlFor="completed">Mark as completed</label>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            {task ? 'Update Task' : 'Create Task'}
          </button>
          {task && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

