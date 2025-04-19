const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5173' // Frontend URL as redirect URI
);

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (error) {
    console.error('Google token verification error:', error);
    throw new Error('Invalid Google token');
  }
};

const handleGoogleAuth = async (req, res) => {
  try {
    const { token, isSignup } = req.body;
    const googleUser = await verifyGoogleToken(token);

    // Check if user already exists
    let user = await User.findOne({ googleId: googleUser.sub });

    if (!user) {
      // Check if user exists with the same email
      user = await User.findOne({ email: googleUser.email });
      
      if (user) {
        if (isSignup) {
          return res.status(400).json({ 
            message: 'An account with this email already exists. Please sign in instead.' 
          });
        }
        // Update existing user with Google ID
        user.googleId = googleUser.sub;
        await user.save();
      } else {
        if (!isSignup) {
          return res.status(400).json({ 
            message: 'No account found with this email. Please sign up first.' 
          });
        }
        // Create new user
        user = await User.create({
          name: googleUser.name,
          email: googleUser.email,
          googleId: googleUser.sub,
          role: 'student', // Default role
          campusEmail: googleUser.email, // Using Google email as campus email
          password: Math.random().toString(36).slice(-8) // Random password for Google users
        });
      }
    } else if (isSignup) {
      return res.status(400).json({ 
        message: 'An account with this Google ID already exists. Please sign in instead.' 
      });
    }

    // Generate JWT token
    const authToken = generateToken(user._id, user.role);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: authToken
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: error.message });
  }
};

module.exports = { handleGoogleAuth }; 