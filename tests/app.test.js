const request = require('supertest');
const app     = require('../app');

// ── Test Suite: Health Check ──────────────────────────
describe('GET /api/health', () => {
  test('harus mengembalikan HTTP 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  test('harus mengembalikan status healthy', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.status).toBe('healthy');
  });

  test('harus menyertakan nama framework', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.framework).toBe('Node.js / Express');
  });

  test('harus menyertakan timestamp', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.timestamp).toBeDefined();
  });
});

// ── Test Suite: Task API ──────────────────────────────
describe('GET /api/tasks', () => {
  test('harus mengembalikan HTTP 200', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
  });

  test('harus mengembalikan array tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('harus menyertakan field total', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.body.total).toBeDefined();
    expect(typeof res.body.total).toBe('number');
  });
});

describe('POST /api/tasks', () => {
  test('harus berhasil menambah task baru', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task dari unit test' });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Task dari unit test');
    expect(res.body.data.done).toBe(false);
  });

  test('harus menolak jika title kosong', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('PUT /api/tasks/:id', () => {
  test('harus berhasil toggle status task', async () => {
    const res = await request(app).put('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('harus mengembalikan 404 jika task tidak ditemukan', async () => {
    const res = await request(app).put('/api/tasks/9999');
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/tasks/:id', () => {
  test('harus berhasil menghapus task', async () => {
    const res = await request(app).delete('/api/tasks/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('harus mengembalikan 404 jika task tidak ditemukan', async () => {
    const res = await request(app).delete('/api/tasks/9999');
    expect(res.statusCode).toBe(404);
  });
});

// ── Test Suite: Halaman Utama ─────────────────────────
describe('GET /', () => {
  test('harus mengembalikan HTTP 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});
