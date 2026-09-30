# Task Manager REST API

A full-stack REST API built for managing tasks, transitioning from temporary in-memory storage to a persistent cloud database.

## Tech Stack
* **Backend:** Node.js, Express
* **Database:** MongoDB Atlas, Mongoose
* **Environment Security:** Dotenv, Git/GitHub

## API Endpoints
* `GET /api/health` - Check server status
* `GET /api/tasks` - Retrieve all tasks from MongoDB
* `POST /api/tasks` - Create a new persistent task
