const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middleware/error.handler');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    };

app.use(cors(corsOptions));
app.use(express.json());

// Mount all API routes under /api
app.use('/api', routes);

// Global error handler
app.use(errorHandler);

module.exports = app;
