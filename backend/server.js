const express = require('express');
const cors = require('cors');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

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

// === SERVE FRONTEND STATIC FILES ===
// __dirname is /app/backend, so dist is one level up at /app/dist
const distPath = path.join(__dirname, '..', 'dist');
console.log('Serving static files from:', distPath);

app.use(express.static(distPath));

// Fallback for React Router - serve index.html for all non-API routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexFile = path.join(distPath, 'index.html');
  res.sendFile(indexFile, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(404).send('App not found. Make sure to build the frontend first.');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('NODE_ENV:', process.env.NODE_ENV);
});
