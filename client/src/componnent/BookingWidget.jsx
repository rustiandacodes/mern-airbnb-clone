import React from 'react';

const BookingWidget = ({ place }) => {
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
          <div className="flex gap-2">
            <div className="border p-3 rounded-t-2xl">
              <label>Check In :</label>
              <input className="w-full mt-2 border p-1 rounded-md" type="date" />
            </div>
            <div className="border p-3">
              <label>Check Out :</label>
              <input className="w-full mt-2 border p-1 rounded-md" type="date" />
            </div>
          </div>
          <div className="border p-3 rounded-b-2xl">
            <label>Number of guests :</label>
            <input type="number" value={1} />
          </div>
          <button className="primary">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
