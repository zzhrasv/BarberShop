const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');

const app = express();
const prisma = new PrismaClient();

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

// Create a booking
app.post('/api/bookings', async (req, res) => {
  const { customerName, phoneNumber, bookingDate, bookingTime, serviceId } = req.body;
  try {
    const booking = await prisma.booking.create({
      data: {
        customerName,
        phoneNumber,
        bookingDate,
        bookingTime,
        serviceId: Number(serviceId),
      },
    });
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
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (admin && admin.password === password) {
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
app.post('/api/memberships', async (req, res) => {
  const { name, phoneNumber, email, packageType } = req.body;
  try {
    const member = await prisma.member.create({
      data: { name, phoneNumber, email, packageType },
    });
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
