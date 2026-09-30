require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to allow JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

    // Define what a Task looks like in our database
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title']
    },
    completed: {
        type: Boolean,
        default: false // New tasks are incomplete by default
    }
});

// Create the model from the schema
const Task = mongoose.model('Task', taskSchema);

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


// 1. GET ROUTE: Fetch all tasks from MongoDB
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Asks MongoDB for all tasks
        
        res.status(200).json({
            status: "success",
            results: tasks.length,
            data: tasks
        });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
});

// 2. POST ROUTE: Create a new task in MongoDB
app.post('/api/tasks', async (req, res) => {
    try {
        // Task.create() automatically builds and saves it to the database
        const newTask = await Task.create({
            title: req.body.title
        });
        
        res.status(201).json({
            status: "success",
            data: newTask
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
});
    
