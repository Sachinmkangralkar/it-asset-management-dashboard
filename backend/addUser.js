// File: backend/addUser.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Your User model
const connectDB = require('./config/db'); // Your DB connection function

const addUser = async () => {
  // Get email and password from the command line arguments
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.log('Please provide an email and a password.');
    console.log('Usage: node addUser.js <email> <password>');
    process.exit(1);
  }

  await connectDB();

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User with this email already exists.');
      process.exit(1);
    }

    // Create and save the new user with a hashed password
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    console.log(`User '${email}' created successfully!`);
  } catch (error) {
    console.error('Error creating user:', error.message);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
};

addUser();