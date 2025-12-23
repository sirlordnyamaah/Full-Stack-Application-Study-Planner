const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initDatabase } = require('./config/database');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow CORS from frontend URL or any origin in development
const allowedOrigins = process.env.FRONTEND_URL 
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now - tighten in production
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tasks', tasksRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Study Planner API is running' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

