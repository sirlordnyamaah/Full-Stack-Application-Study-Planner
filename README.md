# Study Planner - Full-Stack Application

A full-stack study planner application that helps students organize and manage their study tasks. Built with React, Express.js, and PostgreSQL.

## Features

- ✅ Create, Read, Update, and Delete study tasks
- ✅ Organize tasks by subject/category
- ✅ Set due dates for tasks
- ✅ Mark tasks as completed
- ✅ Filter tasks by status (All, Pending, Completed)
- ✅ Responsive design for mobile and desktop
- ✅ Real-time task management

## Tech Stack

### Frontend
- **React** - UI library
- **Axios** - HTTP client for API requests
- **CSS3** - Responsive styling

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Node.js** - Runtime environment

## Project Structure

```
study-planner/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskItem.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── backend/           # Express.js API
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   └── tasks.js
│   │   └── server.js
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd "Project 6"
```

### 2. Database Setup

1. Create a PostgreSQL database:
```bash
createdb study_planner
```

Or using PostgreSQL CLI:
```sql
CREATE DATABASE study_planner;
```

2. The database schema will be automatically created when you start the backend server.

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=study_planner
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password

PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend API will be running on `http://localhost:5000`

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory (optional, defaults to localhost:5000):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React development server:
```bash
npm start
```

The frontend will be running on `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check endpoint

### Example API Request

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Study for Math Exam",
    "description": "Review chapters 1-5",
    "subject": "Mathematics",
    "due_date": "2024-12-15",
    "completed": false
  }'
```

## Database Schema

The `tasks` table has the following structure:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100),
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Backend Deployment (Render/Railway)

1. Push your code to GitHub
2. Connect your repository to Render or Railway
3. Set environment variables in the platform dashboard
4. Deploy the backend service

### Frontend Deployment (Vercel/Netlify)

1. Build the React app:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder to Vercel or Netlify
3. Set the `REACT_APP_API_URL` environment variable to your deployed backend URL

### Recommended Platforms

- **Vercel** - Great for React/Next.js apps
- **Render** - Good for full-stack apps
- **Railway** - Easy PostgreSQL integration
- **Netlify** - Simple frontend deployment

## Development Workflow

1. Make changes to the code
2. Test locally
3. Commit changes with descriptive messages:
```bash
git add .
git commit -m "Add feature: task filtering"
git push
```

## Git Commits

This project includes meaningful Git commits demonstrating:
- Feature development
- Bug fixes
- Code refactoring
- Documentation updates

## Future Enhancements

Potential features for future development:
- User authentication
- Task reminders/notifications
- Task priority levels
- Calendar view
- Task statistics and analytics
- Export tasks to PDF/CSV

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running: `pg_isready`
- Verify database credentials in `.env`
- Ensure port 5000 is not in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` in frontend `.env`

### Database connection errors
- Ensure PostgreSQL is installed and running
- Verify database exists: `psql -l`
- Check user permissions

## License

This project is created for educational purposes.

## Author

Created as a final project for the Immersive Engineering Lab course.

## Reflections

This project demonstrates a complete full-stack application with:
- **Frontend**: Responsive React application with client-side interactivity
- **Backend**: RESTful API with Express.js handling routing and business logic
- **Database**: PostgreSQL for persistent data storage with CRUD operations
- **Integration**: Proper HTTP communication between frontend and backend
- **Deployment**: Cloud-ready architecture for easy deployment

The application showcases modern web development practices including component-based architecture, RESTful API design, and responsive UI/UX principles.

