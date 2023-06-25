import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Browse from "./Pages/Browse";
import Create from "./Pages/Create";
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/browse" component={Browse} />
          <Route path="/create" component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
