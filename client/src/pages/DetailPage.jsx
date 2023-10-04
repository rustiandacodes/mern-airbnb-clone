import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import BookingWidget from '../componnent/BookingWidget';

const DetailPage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState([]);
  const [showAllPhotos, setAllPhotos] = useState(false);

  useEffect(() => {
    axios.get('/places/' + id).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (!place) {
    return '';
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black h-fit">
        <div onClick={() => setAllPhotos(false)} className="fixed left-10 top-10 p-1 rounded-full opacity-70 hover:opacity-100 bg-gray-100 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="max-w-[1200px] p-10 mx-auto flex flex-col gap-2">
          <h2 className="text-white font-medium mb-5">Photos for {place.title}</h2>
          {place?.photos?.length > 0 && place.photos.map((photo) => <img className="mx-auto w-full" src={import.meta.env.VITE_API_URL + '/uploads/' + photo} alt="places" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px] ">
      <h1 className="font-semibold text-2xl">{place.title}</h1>
      <Link to={'/'} className=" underline flex gap-1 my-3 items-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <p>{place.address}</p>
      </Link>
      <div onClick={() => setAllPhotos(true)} className="relative my-8 grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden cursor-pointer">
        <div
          onClick={() => {
            setAllPhotos(true);
          }}
          className="absolute bg-white opacity-75 hover:opacity-100 bottom-5 right-5 px-4 py-2 flex gap-1 cursor-pointer rounded-lg"
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
        <div className="">{place.photos?.[0] && <div>{place.photos?.[0] && <img className="aspect-square w-full object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[0]} alt="places" />}</div>}</div>
        <div className="grid">
          {place.photos?.[1] && <img className="aspect-square w-full object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[1]} alt="places" />}
          {place.photos?.[2] && <img className="aspect-square w-full pt-2 object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[2]} alt="places" />}
        </div>
      </div>

      <BookingWidget place={place} />
    </div>
  );
};

export default DetailPage;
