const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const leadRoutes = require('./routes/lead.routes');
const ticketRoutes = require('./routes/ticket.routes');
const projectRoutes = require('./routes/project.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Update with your frontend URLs
  credentials: true
}));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/projects', projectRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
