const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// sample data
const tasks = [
  { id: 1, title: 'Learn Node.js', completed: false, priority: 'high', createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, priority: 'medium', createdAt: new Date() },
  { id: 3, title: 'Write Documentation', completed: false, priority: 'low', createdAt: new Date() },
  { id: 4, title: 'Test API with Postman', completed: true, priority: 'medium', createdAt: new Date() },
  { id: 5, title: 'Deploy Project', completed: false, priority: 'high', createdAt: new Date() }
];

// routes
app.get('/', (req, res) => res.send('Task Management API is running!'));

// /tasks → return all 5
app.get('/tasks', (req, res) => res.json(tasks));

// /health → status and uptime
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// /task/:id → find by ID, handle errors
app.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // invalid format
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID format' });

  const task = tasks.find(t => t.id === id);

  if (!task) return res.status(404).json({ error: 'Task not found' });

  res.json(task);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
