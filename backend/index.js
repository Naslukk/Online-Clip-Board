const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://0.0.0.0:27017/clipboard').then(() => {
    console.log('Connection successful');
});

app.use('/', routes); // Mount the routes under '/api'

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});