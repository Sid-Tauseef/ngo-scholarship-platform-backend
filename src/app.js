const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middleware/error.handler');

const app = express();

// ✅ Updated CORS options to allow both local and deployed frontend
const allowedOrigins = [
  'http://localhost:5173',
  'https://maulanazahideducationaltrust.web.app',
  'https://www.maulanazahideducationaltrust.web.app' // optional but safe to include
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Mount all API routes under /api
app.use('/api', routes);

// Global error handler
app.use(errorHandler);

module.exports = app;
