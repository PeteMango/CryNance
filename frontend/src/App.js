import logo from './logo.svg';
import './App.css';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path = '/' exact component = {Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
