import './App.css';

import { HashRouter as Router, Switch, Route } from 'react-router-dom'; 

import Navbar from './Components/Navbar'; 
import Login from './Pages/Login';
import Browse from './Pages/Browse';

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
    </div>
  );
}

export default App;
