const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to allow JSON data
app.use(express.json());

// Your very first API endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "success", message: "My first backend endpoint is live!" });
});

// 3. PATCH ROUTE: Update an existing task
app.patch('/api/tasks/:id', (req, res) => {
    // Find the task by the ID in the URL
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ status: "fail", message: "Task not found" });
    }

    // Update the fields if they are provided in the request
    if (req.body.title) task.title = req.body.title;
    if (req.body.completed !== undefined) task.completed = req.body.completed;

    res.status(200).json({
        status: "success",
        data: task
    });
});

// 4. DELETE ROUTE: Remove a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const initialLength = tasks.length;
    
    // Keep all tasks EXCEPT the one with the matching ID
    tasks = tasks.filter(t => t.id !== taskId);

    if (tasks.length === initialLength) {
        return res.status(404).json({ status: "fail", message: "Task not found" });
    }

    res.status(204).json({
        status: "success",
        data: null
    });
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
})