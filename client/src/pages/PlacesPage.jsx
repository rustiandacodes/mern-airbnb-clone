import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../componnent/Perks';
import PhotoUploader from '../componnent/PhotoUploader';
const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState();
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [maxGuests, setMaxGuests] = useState();

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

  return (
    <>
      {action !== 'new' && (
        <div className="text-center mt-10">
          <Link className="inline-flex gap-2 items-center bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add new places</span>
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form className="md:px-10">
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
                <input type="text" placeholder="14:00" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </div>
              <div>
                <h3>Check out time</h3>
                <input type="text" placeholder="21:00" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
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
        </div>
      )}
    </>
  );
};

export default PlacesPage;
