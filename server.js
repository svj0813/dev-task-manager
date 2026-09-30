const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to allow JSON data
app.use(express.json());

// Your very first API endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "success", message: "My first backend endpoint is live!" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Temporary in-memory database for our tasks
let tasks = [];

// 1. GET ROUTE: Fetch all tasks
app.get('/api/tasks', (req, res) => {
    res.status(200).json({
        status: "success",
        results: tasks.length,
        data: tasks
    });
});

// 2. POST ROUTE: Create a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    
    tasks.push(newTask);
    
    res.status(201).json({
        status: "success",
        data: newTask
    });
});