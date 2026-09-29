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