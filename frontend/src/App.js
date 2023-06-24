import logo from './logo.svg';
import './App.css';

import { HashRouter as Router, Switch, Route } from 'react-router-dom'; 

import Navbar from './Components/Navbar'; 
import Login from './Pages/Login'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component = {Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
