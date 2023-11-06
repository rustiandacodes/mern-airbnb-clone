const express = require('express');
const router = express.Router();
const { createNewPlace, getUserPlaces, getAllPlaces, getSinglePlace, updatePlace } = require('../controllers/placeController');

router.post('/places', createNewPlace);
router.get('/user-places', getUserPlaces);
router.get('/places', getAllPlaces);
router.get('/places/:id', getSinglePlace);
router.put('/places', updatePlace);

module.exports = router;
