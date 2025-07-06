/* File: backend/index.js (UPDATED) */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/auth'));
// Use the single, consolidated assets route
app.use('/api/assets', require('./routes/assets'));

const PORT = 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));