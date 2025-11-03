const express = require('express');
const app = express();
const port = 5000;

// Import routes
const taskRoutes = require('./routes/tasks');

// Root route
app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

// Use the routes
app.use('/', taskRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
