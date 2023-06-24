import logo from './logo.svg';
import './App.css';
import axios from "axios"

import { HashRouter as Router, Switch, Route } from 'react-router-dom'; 
import { useEffect, useState } from 'react';

import Navbar from './Components/Navbar'; 
import Login from './Pages/Login'
import DashBoard from './Components/DashBoard';

const code = new URLSearchParams(window.location.search).get('code')
const client_id = "app_staging_0af5473e8e0e5c8eae581173d8a04603"
const client_secret = process.env.client_secret

function App() {
  const [accessToken, setAccesstoken] = useState()

  const data = new URLSearchParams()
  data.append('code', {code})
  data.append('grant_type', 'authorization_code')
  useEffect(() => {
    fetch('https://id.worldcoin.org/token', {
      mode: 'no-cors',
      method: 'POST',
      body: data,
    }).then(res => {
      console.log(data);
      console.log(code);
      console.log(res);
      console.log(res.id_token);
      setAccesstoken(res.data.id_token);
    })
    .catch((err) => {
      console.log(err);
    }) 
  }, [code])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component = {Login}></Route>
        </Switch>
      </Router>
      {/* {code ? (<DashBoard code = {code}></DashBoard>) : (<div></div>)} */}
    </div>
  );
}

export default App;
