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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: "success", message: "My first backend endpoint is live!" });
});

// 1. GET ROUTE: Fetch all tasks from MongoDB
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        
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

// 3. PATCH ROUTE: Update a task in MongoDB
app.patch('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ status: "fail", message: "Task not found" });
        }

        res.status(200).json({
            status: "success",
            data: updatedTask
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
});
    
// 4. DELETE ROUTE: Delete a task from MongoDB
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ status: "fail", message: "Task not found" });
        }

        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});