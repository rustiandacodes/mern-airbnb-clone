import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="mt-4">
      <div className="absolute left-0 top-1/4 right-0">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>
        <form className="max-w-md mx-auto p-3 border rounded-xl">
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
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
