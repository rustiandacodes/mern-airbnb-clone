const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const photoUploaderRoutes = require('./routes/photoUploaderRoutes');
const placesRoutes = require('./routes/placeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const fs = require('fs');
const multer = require('multer');
const photosMiddleware = multer({ dest: 'uploads/' });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URI);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  console.log(req.path, req.method);
  next();
});

app.use('/uploads', express.static(__dirname + '/uploads'));
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace('uploads', ''));
  }
  res.json(uploadedFiles);
});

app.use('/', authRoutes);
app.use('/', photoUploaderRoutes);
app.use('/', placesRoutes);
app.use('/', bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connect on db');
    app.listen(4000, () => {
      console.log('listening on port 4000!');
    });
  })
  .catch((error) => {
    console.log(error);
  });
