const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables (we'll create .env file next)
dotenv.config();

// Create express app
const app = express();

// Middleware (these are like plugins that process requests)
app.use(helmet()); // Security headers
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON data
app.use(morgan('dev')); // Log requests to console

// Test route - to check if server is working
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to ServeCity API!',
        status: 'Server is running 🚀'
    });
});

// Another test route
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📝 Test the API at: http://localhost:${PORT}/`);
});