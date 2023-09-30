import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../componnent/AccountNav';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  console.log(places);

  return (
    <>
      <AccountNav />
      <div className="text-center mt-10">
        list of all added places
        <br />
        <Link className="inline-flex gap-2 items-center bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add new places</span>
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="w-52 h-32 bg-gray-300 grow-0">
                <img src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[0]} alt="places" />
              </div>
              <div className="grow-0 shrink">
                <h2 className="font-bold text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PlacesPage;
