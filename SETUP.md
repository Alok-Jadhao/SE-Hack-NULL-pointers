# Campus LMS - Complete Setup Guide

## Project Overview

This is a fully functional, **NOT hardcoded** Campus Learning Management System with:
- ✅ JavaScript frontend (converted from TypeScript)
- ✅ Real database backend (MongoDB)
- ✅ Configurable environment variables
- ✅ Data seeding endpoints
- ✅ Real-time quiz battles (Socket.io)
- ✅ Role-based dashboards

---

## Prerequisites

- **Node.js**: v16+
- **MongoDB**: Local or Atlas connection string
- **npm**: or yarn

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create `.env` file in `/backend` directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus-lms
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=development
```

**For MongoDB Atlas** (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-lms?retryWrites=true&w=majority
```

### 3. Start Backend Server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

API Endpoints available:
- `GET /` - Status & endpoints
- `POST /api/seed` - **Populate database with sample data**
- `GET /api/seed/status` - Check seeding status
- `GET /api/courses` - List courses
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Create `.env.local` file in `/frontend` directory:
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Frontend Dev Server
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## Initialize Database with Sample Data

### Option 1: Using the Seed API

Once backend is running:
```bash
# Seed the database with sample courses, quizzes, and users
curl -X POST http://localhost:5000/api/seed

# Alternative using curl with JSON
curl -X POST http://localhost:5000/api/seed \
  -H "Content-Type: application/json"

# Using fetch in browser console
fetch('http://localhost:5000/api/seed', { method: 'POST' })
  .then(r => r.json())
  .then(data => console.log(data))
```

### Option 2: Using Postman
1. Create new POST request
2. URL: `http://localhost:5000/api/seed`
3. Click Send

### Check Seeding Status
```bash
curl http://localhost:5000/api/seed/status
```

Response example:
```json
{
  "success": true,
  "seeded": true,
  "stats": {
    "users": 5,
    "courses": 3,
    "quizzes": 2
  }
}
```

---

## Sample Credentials After Seeding

### Instructors
- **Email**: sarah.johnson@campus.edu
- **Password**: instructor123
- **Role**: Instructor

### Students
- **Email**: john.student@campus.edu
- **Password**: student123
- **Role**: Student

### Admin
- **Email**: admin@campus.edu
- **Password**: admin123
- **Role**: Admin

---

## Core Features Now Working

✅ **Courses**
- Fetch from database
- Configurable categories and levels
- Module-based learning paths
- Student enrollment

✅ **Quizzes**
- Real-time multiplayer battles
- Socket.io integration
- Leaderboards
- Difficulty levels

✅ **User Management**
- Role-based authentication
- JWT tokens
- User profiles
- Admin dashboard

✅ **Configuration**
- Centralized config.js
- Environment variables
- Feature flags
- Customizable UI settings

---

## Architecture

### Frontend Structure
```
frontend/src/app/
├── config.js              # Centralized configuration
├── App.jsx                # Main app (JavaScript)
├── routes.jsx             # Routes (JavaScript)
├── context/
│   └── AuthContext.jsx    # Auth provider (JavaScript)
├── lib/
│   └── api.js             # API service layer (JavaScript)
├── pages/                 # All pages converted to .jsx
├── components/            # Reusable components
└── data/
    └── mockData.js        # Fallback mock data
```

### Backend Structure
```
backend/
├── server.js              # Express server
├── config/
│   └── db.js              # MongoDB connection
├── models/                # Mongoose schemas
├── controllers/           # Business logic
├── routes/                # API routes
├── data/
│   └── seedData.js        # Sample data for seeding
└── socket/                # Socket.io handlers
```

---

## Key Improvements Made

1. **TypeScript → JavaScript Conversion**
   - Removed all `.tsx` / `.ts` files
   - Converted to `.jsx` / `.js` with JSDoc comments
   - Maintained full functionality

2. **From Mock to Real Data**
   - Frontend now calls actual backend API
   - Falls back to mock data if API unavailable
   - Real database persistence

3. **Configuration System**
   - Centralized `config.js` for frontend
   - Environment variables for backend
   - Feature flags for customization
   - Customizable API URL

4. **Data Seeding**
   - Automatic seed endpoint
   - Pre-populated users, courses, quizzes
   - Easy reset and repopulate

5. **Full LMS Functionality**
   - Student dashboards
   - Instructor course management
   - Admin panels
   - Real-time quiz battles

---

## Customization Guide

### Add Custom Courses
Edit `backend/data/seedData.js`:
```javascript
courses: [
  {
    title: 'Your Course Title',
    description: 'Description',
    category: 'Your Category',
    level: 'Beginner|Intermediate|Advanced',
    thumbnail: 'https://...image-url...',
    modules: [
      {
        title: 'Module Title',
        description: 'Module Description',
        content: 'https://...content-url...',
        contentType: 'video|pdf|text|slides',
        duration: 60, // minutes
      }
    ],
    isPublished: true,
  }
]
```

### Customize UI Config
Edit `frontend/src/app/config.js`:
```javascript
COURSES: {
  DEFAULT_CATEGORY: 'YourCategory',
  DEFAULT_LEVEL: 'Beginner',
  THUMBNAILS: ['url1', 'url2', ...],
},
FEATURES: {
  ENABLE_QUIZ_BATTLES: true,
  // ... toggle features here
}
```

### Add Feature Flags
In `frontend/src/app/config.js`:
```javascript
FEATURES: {
  YOUR_NEW_FEATURE: true,
}
```

Then check in components:
```javascript
import config from '../config.js';

if (config.FEATURES.YOUR_NEW_FEATURE) {
  // Show feature
}
```

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas connection string is correct
- Check `MONGODB_URI` in `.env`

### CORS Errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Default: `http://localhost:5173`

### API Not Responding
- Check backend is running: `http://localhost:5000`
- Check `VITE_API_URL` in frontend `.env.local`

### Data Not Showing
- Call `POST /api/seed` to populate database
- Check `GET /api/seed/status` for stats

---

## Next Steps

1. ✅ Backend setup and running
2. ✅ Frontend converted to JavaScript
3. ✅ Database seeding configured
4. ✅ Real data working
5. 📝 Deploy to production (AWS, Netlify, Heroku)
6. 📝 Add real authentication (Google OAuth)
7. 📝 Custom domain setup

---

## Support

For issues or questions:
1. Check the logs in terminal
2. Verify `.env` files are configured
3. Ensure all dependencies are installed
4. Check database connection

---

**Status**: Fully working, fully customizable Campus LMS ✨
