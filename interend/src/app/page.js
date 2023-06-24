// import '../App.css';
import axios from "axios"

import { HashRouter as Router, Switch, Route } from 'react-router-dom'; 
import { useClient } from 'next/edge/client';
import { signIn, signOut, useSession } from 'next-auth/client';

import Navbar from './Components/Navbar'; 
import Login from '../Pages/Login';
import Browse from '../Pages/Browse';

const code = new URLSearchParams(window.location.search).get('code')
const client_id = "app_staging_0af5473e8e0e5c8eae581173d8a04603"
const client_secret = process.env.client_secret

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path = '/' exact component = {Login}/>
          <Route path = '/browse' component = {Browse}/>
        </Switch> 
      </Router>
      {/* {code ? (<DashBoard code = {code}></DashBoard>) : (<div></div>)} */}
    </div>
  );
}

export default App;
