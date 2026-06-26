const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const prisma = new PrismaClient();

// Use Helmet for HTTP security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Rate limiter for admin login (max 5 requests per 15 minutes)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Terlalu banyak percobaan login dari IP ini. Silakan coba lagi setelah 15 menit.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for bookings (max 10 bookings per hour)
const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Terlalu banyak pemesanan dari IP ini. Silakan coba lagi dalam satu jam.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure multer (Note: Vercel disk storage is ephemeral)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = '/tmp/uploads'; // Use /tmp for serverless
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// === API ROUTES ===

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

const axios = require('axios');

// Helper for sending WhatsApp notifications (Mocked unless WHATSAPP_API_KEY is provided in .env)
const sendWhatsAppNotification = async (phoneNumber, message) => {
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!apiKey) {
    console.log(`\n--- [WhatsApp Mock Notification] ---\nTo: ${phoneNumber}\nMessage: ${message}\n-----------------------------------\n`);
    return { success: true, message: 'Mock sent successfully' };
  }

  try {
    const response = await axios.post('https://api.fonnte.com/send', {
      target: phoneNumber,
      message: message,
    }, {
      headers: {
        'Authorization': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('[WhatsApp Service Error] Failed to send message:', error.message);
    return { success: false, error: error.message };
  }
};

// Create a booking
app.post('/api/bookings', bookingLimiter, [
  body('customerName').trim().notEmpty().withMessage('Nama customer wajib diisi'),
  body('phoneNumber').trim().notEmpty().withMessage('Nomor WhatsApp wajib diisi'),
  body('bookingDate').trim().notEmpty().withMessage('Tanggal booking wajib diisi'),
  body('bookingTime').trim().notEmpty().withMessage('Waktu booking wajib diisi'),
  body('serviceId').isInt().withMessage('Layanan tidak valid')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { customerName, phoneNumber, bookingDate, bookingTime, serviceId } = req.body;
  try {
    const service = await prisma.service.findUnique({ where: { id: Number(serviceId) } });
    const serviceName = service ? service.name : 'Layanan Pilihan';
    const servicePrice = service ? `Rp ${service.price.toLocaleString('id-ID')}` : 'Rp 0';

    const booking = await prisma.booking.create({
      data: {
        customerName,
        phoneNumber,
        bookingDate,
        bookingTime,
        serviceId: Number(serviceId),
      },
    });

    // Kirim notifikasi WhatsApp otomatis
    const message = `Halo ${customerName},\n\nTerima kasih telah melakukan pemesanan di Eg'nin Barbershop!\n\nDetail Booking:\n- Layanan: ${serviceName}\n- Harga: ${servicePrice}\n- Tanggal: ${bookingDate}\n- Jam: ${bookingTime}\n\n*Catatan: Pembayaran booking dilakukan di tempat (kasir) setelah layanan selesai.*\n\nKami menunggu kehadiran Anda!\n\n*Eg'nin Barbershop*\nAlamat: Jl. KH. Ahmad Dahlan, Dusun III, Dukuhwaluh, Kec. Kembaran, Kabupaten Banyumas, Jawa Tengah 53182`;
    await sendWhatsAppNotification(phoneNumber, message);

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get all bookings (For Admin Dashboard)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Admin Login
app.post('/api/admin/login', loginLimiter, [
  body('email').isEmail().withMessage('Format email tidak valid'),
  body('password').notEmpty().withMessage('Password wajib diisi')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (admin && await bcrypt.compare(password, admin.password)) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Memberships APIs
app.post('/api/memberships', [
  body('name').trim().notEmpty().withMessage('Nama wajib diisi'),
  body('phoneNumber').trim().notEmpty().withMessage('Nomor WhatsApp wajib diisi'),
  body('email').isEmail().withMessage('Format email tidak valid'),
  body('packageType').trim().notEmpty().withMessage('Paket harus dipilih')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, phoneNumber, email, packageType } = req.body;
  try {
    const member = await prisma.member.create({
      data: { name, phoneNumber, email, packageType },
    });

    // Kirim notifikasi WhatsApp otomatis
    const message = `Halo ${name},\n\nSelamat! Anda telah resmi menjadi member eksklusif di BarberShop.\n\nDetail Membership:\n- Paket: ${packageType}\n- Email terdaftar: ${email}\n\nTerima kasih atas kepercayaan Anda!`;
    await sendWhatsAppNotification(phoneNumber, message);

    res.status(201).json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register membership' });
  }
});

app.get('/api/memberships', async (req, res) => {
  try {
    const members = await prisma.member.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch memberships' });
  }
});

// Gallery APIs
app.post('/api/gallery', upload.single('image'), async (req, res) => {
  const { title } = req.body;
  if (!req.file) return res.status(400).json({ error: 'Image file is required' });

  try {
    // Note: On Vercel, this file will disappear after the function execution finishes.
    // For production, consider using Cloudinary or AWS S3.
    const imageUrl = `/uploads/${req.file.filename}`;
    const image = await prisma.gallery.create({
      data: { title: title || 'Untitled', imageUrl },
    });
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const images = await prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.gallery.delete({ where: { id: Number(id) } });
    res.json({ success: true, message: 'Image record deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = app;
