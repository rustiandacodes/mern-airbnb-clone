import React, { useEffect, useState } from 'react';
import AccountNav from '../componnent/AccountNav';
import axios from 'axios';
import { format, differenceInCalendarDays } from 'date-fns';
import PlaceImage from '../componnent/PlaceImage';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
  const [bookings, setBookings] = useState();
  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <>
      <AccountNav />
      <div className="container mx-auto">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link to={booking._id} key={booking._id} className="w-full bg-gray-100 flex items-center gap-5 mb-3 p-4 rounded-2xl overflow-hidden">
              <div className="w-48">
                <PlaceImage place={booking.place} className={'rounded-xl'} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{booking.place.title}</h3>
                <div className="flex gap-4">
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                    <p> {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      />
                    </svg>
                    <p>
                      {format(new Date(booking.checkIn), 'yyyy-MM-dd')} <span>-</span> {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                  <p>
                    <span>Total price : IDR </span>
                    {booking.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default BookingsPage;
