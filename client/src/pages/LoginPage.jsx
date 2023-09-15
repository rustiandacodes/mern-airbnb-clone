import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/login', { email, password });
      alert('Login successfull!');
      setRedirect(true);
      setUser(data);
    } catch (error) {
      alert('Login failed, please try again later!');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="mt-4">
      <div className="absolute left-0 top-1/4 right-0">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>
        <form className="max-w-md mx-auto p-3 border rounded-xl" onSubmit={(e) => handleLogin(e)}>
          <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            <span>Don't have any account yet? </span>
            <Link className="underline text-black font-semibold" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
