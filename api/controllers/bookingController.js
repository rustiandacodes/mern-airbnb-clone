const jwt = require('jsonwebtoken');
const jwtSecret = 'DVVC1OPrPYKJpLTEkJ7RkQ4R1dw5SZxG';
const Booking = require('../models/bookingModel');

const getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

const createBooking = (req, res) => {
  const { name, phone, place, checkIn, checkOut, numberOfGuests, price, user } = req.body;
  Booking.create({
    name,
    user,
    phone,
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    price,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

const getBookings = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
};

module.exports = { createBooking, getBookings };
