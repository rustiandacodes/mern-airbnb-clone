import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterUser = (e) => {
    e.preventDefault();
    axios.get(`${import.meta.env.VITE_API_URL}/register`);
  };

  return (
    <div className="mt-4">
      <div className="absolute left-0 top-1/4 right-0">
        <h1 className="text-4xl text-center mb-4 ">Register</h1>
        <form
          className="max-w-md mx-auto p-3 border rounded-xl"
          onSubmit={(e) => {
            handleRegisterUser(e);
          }}
        >
          <input type="text" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="primary">Submit</button>
          <div className="text-center py-2 text-gray-500">
            <span>Have an account? </span>
            <Link className="underline text-black font-semibold" to={'/login'}>
              Login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
