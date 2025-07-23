
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Photo Schema
const photoSchema = new mongoose.Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now },
});
const Photo = mongoose.model('Photo', photoSchema);

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Pawtobooth Backend is Live!');
});

// Upload photo metadata route
app.post('/upload-photo', async (req, res) => {
  try {
    const { filename } = req.body;
    const newPhoto = new Photo({ filename });
    await newPhoto.save();
    res.status(201).json({ message: 'Photo metadata saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while saving photo metadata' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Pawtobooth backend running on port ${port}`);
});
