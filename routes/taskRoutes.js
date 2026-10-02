const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all task routes
router.use(authController.protect);

router.route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask);

router.route('/:id')
    .patch(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;