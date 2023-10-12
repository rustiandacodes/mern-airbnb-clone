import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format, differenceInCalendarDays } from 'date-fns';
import axios from 'axios';

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  const [showAllPhotos, setAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        foundBooking ? setBooking(foundBooking) : '';
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }
  if (!booking.place) {
    return '';
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black h-fit z-30">
        <div onClick={() => setAllPhotos(false)} className="fixed left-10 top-10 p-1 rounded-full opacity-70 hover:opacity-100 bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="max-w-[1200px] p-10 mx-auto flex flex-col gap-2">
          <h2 className="text-white font-medium mb-5">Photos for {booking.place?.title}</h2>
          {booking?.place?.photos?.length > 0 && booking.place.photos.map((photo) => <img key={photo} className="mx-auto w-full" src={import.meta.env.VITE_API_URL + '/uploads/' + photo} alt="places" />)}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto max-w-[1000px] px-5 pt-36">
        <h1 className="font-semibold text-2xl">{booking.place.title}</h1>
        <Link to={'/'} className=" underline flex gap-1 my-3 items-center ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p>{booking.place.address}</p>
        </Link>
        <div className="flex justify-around w-full bg-gray-200 rounded-xl py-5">
          <div className="text-center">
            <p className="font-semibold mb-2">Your booking information</p>
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
          </div>
          <div className="text-center bg-primary text-white px-4 py-3 rounded-lg">
            <p className="font-semibold">Total Price</p>
            <p className="text-xl">{booking.price.toLocaleString()}</p>
          </div>
        </div>
        <div onClick={() => setAllPhotos(true)} className="relative my-8 grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden cursor-pointer">
          <div
            onClick={() => {
              setAllPhotos(true);
            }}
            className="absolute bg-white hover:opacity-80 bottom-5 right-5 px-4 py-2 flex gap-1 cursor-pointer rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <p>show more photos</p>
          </div>
          <div>{booking?.place?.photos?.[0] && <div>{booking.place.photos?.[0] && <img className="aspect-square w-full object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + booking?.place?.photos[0]} alt="places" />}</div>}</div>
          <div className="grid">
            {booking?.place?.photos?.[1] && <img className="aspect-square w-full object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + booking?.place?.photos?.[1]} alt="places" />}
            {booking?.place?.photos?.[2] && <img className="aspect-square w-full pt-2 object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + booking?.place?.photos[2]} alt="places" />}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
