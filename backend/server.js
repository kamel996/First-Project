const express = require('express');
//This line imports the Express.js library.
const mongoose = require('mongoose');
// This line imports the Mongoose library.
const dotenv = require('dotenv');
// This line imports the Dotenv library.
const app = express();
// This line creates an instance of the Express.js application.
const servicesRoutes = require('./routes/services');
// This line imports a file containing routing logic for the "/services" endpoint path and assigns it to a constant variable named "servicesRoutes".
const projectsRoutes = require('./routes/projects');
// This line imports a file containing routing logic for the "/projects" endpoint path and assigns it to a constant variable named "projectsRoutes".
const clientsRoutes = require('./routes/clients');
// This line imports a file containing routing logic for the "/clients" endpoint path and assigns it to a constant variable named "clientsRoutes".
const contactsRoutes = require('./routes/contacts');
// This line imports a file containing routing logic for the "/contacts" endpoint path and assigns it to a constant variable named "contactsRoutes".
const adminRoutes = require('./routes/admin');
const authMiddleware = require('./utils/authMiddleware');

const errorHandler = require('./utils/errorHandler');
// This line imports a file containing logic for handling errors and assigns it to a constant variable named "errorHandler".
const winston = require('winston');
//winston library for logging, which writes the logs in files.

// const db = require('./config/db');
require('./config/db');



const { createLogger, format, transports } = require('winston');
// This line imports specific functions from the winston library.
const { combine, timestamp, label, printf } = format;
// This line imports specific functions from the format module of winston library.



dotenv.config();
// This line reads environment variables from a .env file and makes them available to the application.



const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
// This line creates a constant variable named "myFormat" which holds a custom log format function that takes an object with level, message, label, and timestamp properties and returns a string in the format of timestamp, label, level and message.

const logger = createLogger({
    // This line creates a constant variable named "logger" which holds a new winston logger object with the following options.
    format: combine(
        // This line sets the format option of the logger object to the result of combining the following formats.
        label({ label: 'backend' }),
        // This line adds a label named "backend" to the log.
        timestamp(),
        myFormat
        //  This line adds the custom format function to the log.
    ),
    transports: [
        // This line sets the transports option of the logger object to an array containing the following transports.
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
        // This line creates a new File transport that writes all logs to a file named "combined.log".
    ],
});

app.use(express.json());
// This line tells the Express.js application to parse incoming JSON data from HTTP request bodies.
app.use('/services', servicesRoutes);
// This line tells the Express.js application to use the routing logic for the "/services" endpoint path that was imported earlier.
app.use('/projects', projectsRoutes);
// This line tells the Express.js application to use the routing logic for the "/projects" endpoint path that was imported earlier.
app.use('/clients', clientsRoutes);
app.use('/contacts', contactsRoutes);
// app.use('/admin', adminRoutes);
// app.use('/admin', authMiddleware, adminRoutes);
app.use('/admin', adminRoutes);

// This line tells the Express.js application to use the routing logic for the "/admin"
app.use(errorHandler);
//This line tells the Express.js application to use the custom error handler logic that was imported earlier.


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// this script sets up a Node.js application using the Express.js framework, 
// connects to a MongoDB database using Mongoose, sets up routing for different endpoint paths, 
// sets up a custom error handler, sets up logging using winston library,
//  and starts the server on a specified port (or a default port of 3000).