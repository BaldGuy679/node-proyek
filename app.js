const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────────
// In-memory database (demo)
// ─────────────────────────────────────────────
const tasks = [
  { id: 1, title: 'Implementasi CI/CD dengan GitHub Actions', done: true },
  { id: 2, title: 'Deploy Node.js ke VPS via SSH', done: true },
  { id: 3, title: 'Konfigurasi PM2 sebagai process manager', done: false },
];

let nextId = 4;

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// Home
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─────────────────────────────────────────────
// HEALTH CHECK (FIX UTAMA UNTUK UNIT TEST)
// ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    framework: 'Node.js / Express',
    version: process.version,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    data: tasks,
    total: tasks.length,
  });
});

// Add task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Judul task tidak boleh kosong',
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    data: newTask,
  });
});

// Toggle task
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task tidak ditemukan',
    });
  }

  task.done = !task.done;

  res.json({
    success: true,
    data: task,
  });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task tidak ditemukan',
    });
  }

  tasks.splice(index, 1);

  res.json({
    success: true,
    message: 'Task berhasil dihapus',
  });
});

// ─────────────────────────────────────────────
// START SERVER (AMAN UNTUK TEST + PM2)
// ─────────────────────────────────────────────
function startServer() {
  return app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
    console.log(`🔎 Health check: http://localhost:${PORT}/api/health`);
  });
}

// hanya jalan jika file dieksekusi langsung (PM2 safe + test safe)
if (require.main === module) {
  startServer();
}

module.exports = app;