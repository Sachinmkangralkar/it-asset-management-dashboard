require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const setAdmin = async () => {
  const email = process.argv[2]; // Get email from command line

  if (!email) {
    console.log('Please provide the email of the user to make an admin.');
    console.log('Usage: node setAdmin.js <user-email>');
    process.exit(1);
  }

  await connectDB();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email '${email}' not found.`);
      process.exit(1);
    }

    user.isAdmin = true; // Set the admin flag
    await user.save();

    console.log(`Successfully made '${email}' an admin!`);
  } catch (error) {
    console.error('Error setting admin:', error.message);
  } finally {
    await mongoose.disconnect();
  }
};

setAdmin();
