import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../componnent/AccountNav';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <AccountNav />

      <div className="text-center mt-10 ">
        <Link className="inline-flex gap-2 items-center bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add new places</span>
        </Link>
      </div>

      <div className="mt-8 container mx-auto">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={'/account/places/' + place._id} key={place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl max-h-40 overflow-hidden my-5">
              <div className="w-[30%] md:w-60">
                <img className="rounded-2xl w-full h-full object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[0]} alt="places" />
              </div>
              <div className="w-[80%] max-h-32">
                <h2 className="font-bold text-xl">{place.title}</h2>
                <p className="text-sm mt-2 text-clip overflow-hidden">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default PlacesPage;
