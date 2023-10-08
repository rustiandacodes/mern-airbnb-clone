import React from 'react';

const PlaceImage = ({ place, index = 0, className }) => {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img className={className} src={import.meta.env.VITE_API_URL + '/uploads/' + place.photos[0]} alt={index} />;
};

export default PlaceImage;
