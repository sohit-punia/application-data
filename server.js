const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Form = require('./models/Entry');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser middleware for JSON

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Connection error:', err));

// Define the routes
app.post('/submit-form', async (req, res) => {
    try {
        const { serialNumber, subject, date, address } = req.body;
        const form = new Form({ serialNumber, subject, date, address });
        await form.save();
        res.status(201).send({ message: 'Form submitted successfully', form });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Handle any other GET requests (for the root or any undefined paths)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on port 3000 (or the port in .env)
const PORT = process.env.PORT || 3000; // Default to 3000 if not specified in .env
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
