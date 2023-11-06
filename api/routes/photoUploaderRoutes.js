const express = require('express');
const router = express.Router();

const { uploadPhotoByLink } = require('../controllers/photoUploaderController');

router.post('/upload-by-link', uploadPhotoByLink);

module.exports = router;
