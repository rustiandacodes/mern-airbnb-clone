import { useEffect, useState } from 'react';
import axios from 'axios';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  console.log(places);
  return (
    <>
      <div className="grid xl:grid-cols-6 sm:grid-cols-3 grid-cols-3 gap-3">
        {places.map((place, i) => (
          <div key={i} className="max-h-96 cursor-pointer">
            <div className="w-full h-[70%]">
              <img className="object-cover h-full w-full rounded-2xl" src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[0]} alt="places" />
            </div>
            <p className="mt-3 text-sm font-bold truncate">{place.title}</p>
            <p className="truncate">{place.address}</p>
            <p>
              <span className="font-semibold">IDR {place.price.toLocaleString()}</span> /nigth
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default IndexPage;
