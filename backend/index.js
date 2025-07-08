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
app.use('/api/assets', require('./routes/assets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/stats', require('./routes/stats')); 

const PORT = 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));