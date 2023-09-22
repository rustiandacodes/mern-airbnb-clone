import { useState } from 'react';
import axios from 'axios';

const PhotoUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState();
  const addPhotoByLinks = async (e) => {
    e.preventDefault();
    if (!photoLink) {
      alert('you must fill the fileld');
    } else {
      const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
      onChange((prev) => {
        return [...prev, filename];
      });
      setPhotoLink('');
    }
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <>
      <div className="flex gap-3">
        <input type="text" placeholder={'Add using a link ...jpg'} value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} />
        <button
          className="bg-gray rounded-2xl text-sm my-2 p-4 w-fit text-slate-600 font-semibold"
          onClick={(e) => {
            addPhotoByLinks(e);
          }}
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, i) => (
            <div className="h-32 flex" key={i}>
              <img className="rounded-2xl w-full object-cover" src={import.meta.env.VITE_API_URL + '/uploads/' + link} alt="places" />
            </div>
          ))}
        <label className="cursor-pointer h-32 flex justify-center items-center gap-3 border bg-transparent rounded-2xl p-4 text-2xl text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          <input onChange={uploadPhoto} multiple type="file" hidden />
          <span>Upload</span>
        </label>
      </div>
    </>
  );
};

export default PhotoUploader;
