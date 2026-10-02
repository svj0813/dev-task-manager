require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "success", message: "Backend is live!" });
});

// Mount Routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});