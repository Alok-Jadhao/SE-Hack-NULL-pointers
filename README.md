# Campus LMS with Multiplayer Quiz Battles

A modern Learning Management System designed for campus education with real-time multiplayer quiz competitions.

## Features

- **Role-Based Access**: Student and Instructor dashboards
- **Course Management**: Create and organize courses with multimedia content
- **Real-Time Quiz Battles**: Compete with peers in live quiz sessions
- **Progress Tracking**: Monitor learning progress and analytics
- **Google OAuth**: Easy authentication with campus email

## Tech Stack

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io (real-time quiz battles)
- JWT Authentication
- Google OAuth 2.0

### Frontend
- React + Vite
- Tailwind CSS
- Socket.io Client
- React Router

## Project Structure

```
├── backend/          # Express server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   ├── middleware/   # Auth & validation
│   └── socket/       # Socket.io handlers
│
└── frontend/         # React application
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── services/
    └── public/
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Set up environment variables (see `.env.example`)

5. Start the development servers:
```bash
# Backend (port 5000)
cd backend
npm run dev

# Frontend (port 5173)
cd frontend
npm run dev
```

## License
MIT
