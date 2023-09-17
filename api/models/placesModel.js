const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  exteraInfo: String,
  chekIn: number,
  chekOut: number,
  maxGuest: number,
});

const PlaceModel = mongoose.model('Place', placeSchema);
model.exports = PlaceModel;
