import "./App.css";

import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { IDKitWidget } from "@worldcoin/idkit";

import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Browse from "./Pages/Browse";
import Create from "./Pages/Create";

const code = new URLSearchParams(window.location.search).get("code");
const client_id = "app_staging_0af5473e8e0e5c8eae581173d8a04603";
const client_secret = process.env.client_secret;

// import { PolybaseProvider } from "@polybase/react";
// import { Polybase } from "@polybase/client";

// const polybase = new Polybase();

function App() {
  const [accessToken, setAccesstoken] = useState();

  const data = new URLSearchParams();
  data.append("code", { code });
  data.append("grant_type", "authorization_code");
  useEffect(() => {
    fetch("https://id.worldcoin.org/token", {
      mode: "no-cors",
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(data);
        console.log(code);
        console.log(res);
        console.log(res.id_token);
        setAccesstoken(res.data.id_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);
  return (
    <div className="App">
      <Router>
        <IDKitWidget
          app_id="app_staging_0af5473e8e0e5c8eae581173d8a04603" // obtain this from developer.worldcoin.org
          action="my_action"
          enableTelemetry
          onSuccess={(result) => console.log(result)} // pass the proof to the API or your smart contract
        >
          {({ open }) => <button onClick={open}>Click me</button>}
        </IDKitWidget>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/browse" component={Browse} />
          <Route path="/create" component={Create} />
        </Switch>
      </Router>
      {/* {code ? (<DashBoard code = {code}></DashBoard>) : (<div></div>)} */}
    </div>
  );
}

export default App;
