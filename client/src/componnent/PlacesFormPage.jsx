import Perks from '../componnent/Perks';
import PhotoUploader from '../componnent/PhotoUploader';
import { useEffect, useState } from 'react';
import AccountNav from './AccountNav';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [maxGuests, setMaxGuests] = useState();
  const [redirect, setRedirect] = useState(false);

  console.log({ extraInfo, checkIn, checkOut, maxGuests });

  if (id) {
    useEffect(() => {
      axios.get('/places/' + id).then(({ data }) => {
        setTitle(data.title);
        setAddress(data.address);
        setDescription(data.description);
        setAddedPhotos(data.photos);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
      });
    }, []);
  }

  const InputHeader = (text) => {
    return <h2 className="text-lg mt-4 font-semibold">{text}</h2>;
  };

  const InputDescription = (text) => {
    return <p className="text-gray-500 text-sm mb-1">{text}</p>;
  };

  const PreInput = (header, desc) => {
    return (
      <>
        {InputHeader(header)}
        {InputDescription(desc)}
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    if (id) {
      const placeData = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      };
      // update
      await axios.put('/places', {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      // new
      await axios.post('/places', {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }
  return (
    <>
      <AccountNav />
      <form className="md:px-10" onSubmit={savePlace}>
        {PreInput('Title', 'Title for your place should be short and catchy')}
        <input type="text" placeholder="title, example : My lovely apartment..." value={title} onChange={(e) => setTitle(e.target.value)} />
        {PreInput('Address', 'Address for this place')}
        <input type="text" placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        {PreInput('Photos', 'more = better')}
        <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {PreInput('Description', 'description of the place')}
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        {PreInput('Perks', 'select all the perks of your places')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {PreInput('Extra Info', 'house rules,etc')}
        <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)}></textarea>
        {PreInput('Check in&out times', 'add check in and out times, remember to have some tiime to cleaning the room between guest')}
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <h3>Check in time</h3>
            <input type="number" placeholder="14:00" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div>
            <h3>Check out time</h3>
            <input type="number" placeholder="21:00" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
          <div>
            <h3>Max number of guests</h3>
            <input type="number" placeholder="5" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
          </div>
        </div>
        <div>
          <button className="primary">Save</button>
        </div>
      </form>
    </>
  );
};

export default PlacesFormPage;
