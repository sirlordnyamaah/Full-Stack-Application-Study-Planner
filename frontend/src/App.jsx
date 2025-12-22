import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a new task
  const handleCreateTask = async (taskData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/tasks`, taskData);
      setTasks([response.data, ...tasks]);
      setSuccess('Task created successfully!');
      setTimeout(() => setSuccess(null), 3000);
      // Reset form
      setEditingTask(null);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  // Update an existing task
  const handleUpdateTask = async (taskData) => {
    try {
      setError(null);
      const response = await axios.put(`${API_URL}/tasks/${editingTask.id}`, taskData);
      setTasks(tasks.map(task => task.id === editingTask.id ? response.data : task));
      setSuccess('Task updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
      setEditingTask(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError(null);
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
      setSuccess('Task deleted successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (taskId, completed) => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === taskId);
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, {
        ...task,
        completed: completed
      });
      setTasks(tasks.map(t => t.id === taskId ? response.data : t));
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error('Error toggling task completion:', err);
    }
  };

  // Handle form submission
  const handleSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  // Handle edit
  const handleEdit = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📚 Study Planner</h1>
        <p>Organize your study tasks and stay on track</p>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <TaskForm
        task={editingTask}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
      />

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
}

export default App;

