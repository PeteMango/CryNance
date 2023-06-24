import { Link } from 'react-router-dom';
import React from 'react';

const client_secret = process.env.client_secret
const AUTH_URL = "https://id.worldcoin.org/authorize?client_id=app_staging_0af5473e8e0e5c8eae581173d8a04603&client_secret=${client_secret}&response_type=code&redirect_uri=http://localhost:3000/#/"

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                
                <div className="navbar-center">
                  <Link to="/create" className="btn btn-primary">Create</Link>
                </div>
                
                <div className="navbar-end">
                    <a href={AUTH_URL} className="btn">Login</a>
                </div>
            </div>      
        </>
    );
};

export default Navbar;
