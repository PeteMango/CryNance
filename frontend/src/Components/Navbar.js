import { Link, useHistory } from "react-router-dom";
import { IDKitWidget } from "@worldcoin/idkit";
import React from "react";

const client_secret = process.env.client_secret;
const AUTH_URL = `https://id.worldcoin.org/authorize?client_id=app_staging_0af5473e8e0e5c8eae581173d8a04603&client_secret=${client_secret}&response_type=code&redirect_uri=http://localhost:3000/#/`;
const code = new URLSearchParams(window.location.search).get("code");

const Navbar = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };

  return (
    <nav className="navbar bg-base-100 flex justify-between items-center px-4">
      <div className="navbar-start">
        <button
          className="btn btn-ghost normal-case text-xl"
          onClick={handleLogoClick}
        >
          CRyNance
        </button>
      </div>
      <div className="navbar-center flex-auto space-x-2"></div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/browse" className="menu-item">
              Browse
            </Link>
          </li>
          <li>
            <Link to="/create" className="menu-item">
              Create
            </Link>
          </li>
          <li>
            <IDKitWidget
              app_id="app_staging_0af5473e8e0e5c8eae581173d8a04603" // obtain this from developer.worldcoin.org
              action="my_action"
              enableTelemetry
              onSuccess={(result) => console.log(result)} // pass the proof to the API or your smart contract
            >
              {({ open }) => <button onClick={open}>Sign In</button>}
            </IDKitWidget>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
