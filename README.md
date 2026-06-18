# Node.js CD Demo

Aplikasi web sederhana berbasis **Node.js / Express** sebagai bukti teknis bahwa sistem *Continuous Deployment* menggunakan GitHub Actions dapat diterapkan pada framework selain Flask.

## Stack Teknologi
- **Runtime:** Node.js 20
- **Framework:** Express.js v4
- **Testing:** Jest + Supertest
- **Process Manager:** PM2
- **CI/CD:** GitHub Actions
- **Server:** VPS DigitalOcean (Ubuntu 24.04 LTS)

## Fitur
- ✅ REST API CRUD untuk Task Manager
- ✅ Endpoint `/api/health` untuk health check CI/CD
- ✅ 9 unit test dengan Jest + Supertest
- ✅ Pipeline CI/CD otomatis via GitHub Actions

## Endpoint API
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/` | Halaman utama |
| GET | `/api/health` | Health check (digunakan pipeline CI/CD) |
| GET | `/api/tasks` | Ambil semua task |
| POST | `/api/tasks` | Tambah task baru |
| PUT | `/api/tasks/:id` | Toggle status task |
| DELETE | `/api/tasks/:id` | Hapus task |

## Menjalankan Lokal
```bash
npm install
npm start
# Buka http://localhost:3000
```

## Menjalankan Unit Test
```bash
npm test
```

## GitHub Secrets yang Dibutuhkan
| Secret | Keterangan |
|--------|-----------|
| `VPS_HOST` | IP atau domain VPS |
| `VPS_USER` | Username SSH |
| `VPS_SSH_KEY` | Private key OpenSSH |

---
*Program Studi Teknologi Rekayasa Internet — Universitas Gadjah Mada*
