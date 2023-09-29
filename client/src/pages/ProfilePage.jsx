import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, useParams } from 'react-router-dom';
import PlacesPage from '../componnent/PlacesFormPage';
import axios from 'axios';
import AccountNav from '../componnent/AccountNav';

const ProfilePage = () => {
  const [toHomePage, setToHomePage] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = () => {
    axios.post('/logout');
    setToHomePage('/');
    setUser(null);
  };

  if (toHomePage) {
    return <Navigate to={toHomePage} />;
  }

  if (!ready) {
    return 'loading...';
  }

  if (ready && !user && !toHomePage) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        {subpage === 'profile' && (
          <div className="text-center max-w-lg mx-auto mt-10">
            logged in as {user.name} ({user.email}) <br />
            <button className="bg-primary text-white w-[70%] rounded-full py-2 mt-2" onClick={logout}>
              Logout
            </button>
          </div>
        )}
        {subpage === 'places' && (
          <div>
            <PlacesPage />
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
