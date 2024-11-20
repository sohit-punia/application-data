const mongoose = require('mongoose');

// Define the schema for the form data
const formSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true }
});

// Create a model based on the schema
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
