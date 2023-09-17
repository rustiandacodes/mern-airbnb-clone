import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import PlacesPage from './PlacesPage';
import axios from 'axios';

const AccountPage = () => {
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

  const linkClasses = (type = null) => {
    let classes = 'py-2 px-6 inline-flex gap-2';
    if (type === subpage) {
      classes = 'py-2 px-6 flex gap-2 bg-primary text-white rounded-full';
    } else {
      classes = 'py-2 px-6 flex gap-2 bg-gray-200 rounded-full';
    }
    return classes;
  };

  return (
    <>
      <div>
        <nav className="w-full flex gap-3 mt-8 justify-center ga-2">
          <Link className={linkClasses('profile')} to={'/account'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span>My Profile</span>
          </Link>
          <Link className={linkClasses('bookings')} to={'/account/bookings'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span>My Bookings</span>
          </Link>
          <Link className={linkClasses('places')} to={'/account/places'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>

            <span>My Accommodations</span>
          </Link>
        </nav>
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

export default AccountPage;
