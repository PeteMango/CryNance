import { Link, useHistory } from 'react-router-dom';
import React from 'react';

const client_secret = process.env.client_secret;
const AUTH_URL = `https://id.worldcoin.org/authorize?client_id=app_staging_0af5473e8e0e5c8eae581173d8a04603&client_secret=${client_secret}&response_type=code&redirect_uri=http://localhost:3000/#/`;

const Navbar = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <nav className="navbar bg-base-100 flex justify-between items-center px-4">
      <div className="navbar-start">
        <button className="btn btn-ghost normal-case text-xl" onClick={handleLogoClick}>CRyNance</button>
      </div>
      <div className="navbar-center flex-auto space-x-2">
        
      </div>
      <div className="navbar-end">
        {/* <a href={AUTH_URL} className="btn btn-secondary transition duration-300 ease-in-out transform hover:scale-105">Login</a>
        <Link to="/browse" className="btn btn-primary transition duration-300 ease-in-out transform hover:scale-105">Browse</Link>
        <Link to="/create" className="btn btn-primary transition duration-300 ease-in-out transform hover:scale-105">Create</Link> */}
        <ul class="menu menu-horizontal px-1">
          <li><a>Link</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
