import User from '../models/User.js';
import Course from '../models/Course.js';
import Quiz from '../models/Quiz.js';
import bcrypt from 'bcryptjs';
import { seedData } from '../data/seedData.js';

/**
 * Seed the database with sample data
 * DELETE all existing data first
 */
export const seedDatabase = async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Quiz.deleteMany({});

    // Create users
    const users = [];
    for (const userData of seedData.users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      users.push(user);
    }

    // Create courses (assign to instructors)
    const instructors = users.filter(u => u.role === 'instructor');
    const courses = [];
    for (let i = 0; i < seedData.courses.length; i++) {
      const courseData = seedData.courses[i];
      const course = await Course.create({
        ...courseData,
        instructor: instructors[i % instructors.length]._id,
      });
      courses.push(course);
    }

    // Create quizzes
    for (let i = 0; i < seedData.quizzes.length; i++) {
      const quizData = seedData.quizzes[i];
      await Quiz.create({
        title: quizData.title,
        description: quizData.description,
        questions: quizData.questions,
        creator: instructors[i % instructors.length]._id,
        course: courses[i % courses.length]._id,
        passingScore: quizData.passingScore,
        maxParticipants: quizData.maxParticipants,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      stats: {
        users: users.length,
        courses: courses.length,
        quizzes: seedData.quizzes.length,
      },
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get seeding status
 */
export const getSeedingStatus = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const courseCount = await Course.countDocuments();
    const quizCount = await Quiz.countDocuments();

    res.json({
      success: true,
      seeded: userCount > 0,
      stats: {
        users: userCount,
        courses: courseCount,
        quizzes: quizCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

