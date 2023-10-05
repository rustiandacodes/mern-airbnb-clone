import React, { useEffect, useState, useContext } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const bookThisPlace = async () => {
    const response = await axios.post('/booking', { name, phone, place: place._id, checkIn, checkOut, numberOfGuests, price: numberOfNight * place.price });
    console.log(response.data);
  };

  let numberOfNight = 0;

  if (checkIn && checkOut) {
    numberOfNight = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  return (
    <div className="py-5 grid gap-8 grid-cols-[2fr_1fr]">
      <div>
        <h2 className="font-semibold text-lg mb-2">Description</h2>
        <p>{place.description}</p>
        <p className="mt-5">Check in : {place.checkIn}</p>
        <p>Check out : {place.checkOut}</p>
        <p> Max number of guests : {place.maxGuests}</p>
      </div>
      <div className="p-4 bg-white shadow rounded-2xl">
        <p className="font-bold text-xl text-center">Price : IDR {place.price} / per night</p>
        <div className=" p-3">
          <div className="flex">
            <div className="border p-3 rounded-tl-2xl">
              <label>Check In :</label>
              <input
                onChange={(e) => {
                  setCheckIn(e.target.value);
                }}
                value={checkIn}
                className="w-full mt-2 border p-1 rounded-md"
                type="date"
              />
            </div>
            <div className="border rounded-tr-2xl p-3">
              <label>Check Out :</label>
              <input
                onChange={(e) => {
                  setCheckOut(e.target.value);
                }}
                value={checkOut}
                className="w-full mt-2 border p-1 rounded-md"
                type="date"
              />
            </div>
          </div>
          <div className="border p-3">
            <label>Number of guests :</label>
            <input
              type="number"
              placeholder="1"
              value={numberOfGuests}
              onChange={(e) => {
                setNumberOfGuests(e.target.value);
              }}
            />
          </div>
          <div className="border p-3">
            <label>Name :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="border p-3 rounded-b-2xl">
            <label>Phone :</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <button onClick={() => bookThisPlace()} className="primary">
            Book Now
            <span> {numberOfNight * place.price}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
