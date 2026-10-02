const Task = require('../models/taskModel');

// 1. Get user tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({
            status: "success",
            results: tasks.length,
            data: tasks
        });
    } catch (err) {
        res.status(500).json({ status: "fail", message: err.message });
    }
};

// 2. Create task for logged-in user
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            user: req.user._id
        });
        res.status(201).json({
            status: "success",
            data: newTask
        });
    } catch (err) {
        res.status(400).json({ status: "fail", message: err.message });
    }
};

// 3. Update task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
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
};

// 4. Delete task
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });

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
};