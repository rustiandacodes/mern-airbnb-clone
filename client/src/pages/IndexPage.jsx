import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <>
      <div className=" container mx-auto grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {places.length > 0 &&
          places.map((place, i) => (
            <Link to={'/place/' + place._id} key={i}>
              <div className="cursor-pointer flex">
                <img className="object-cover aspect-square rounded-2xl" src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[0]} alt="places" />
              </div>
              <div className="mt-2">
                <p className="font-semibold truncate">{place.title}</p>
                <p className="truncate text-lg">{place.address}</p>
                <p className="font-semibold text-sm">
                  <span>IDR {place.price.toLocaleString()}</span> per nigth
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default IndexPage;
