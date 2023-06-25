import React, { useState, useEffect } from 'react'
import {IDKitWidget} from '@worldcoin/idkit'

export const Auth = () => {
  const app_id = "app_staging_e65a6e24ba4f9f99ce1c64aa1aa38fbf"
  const code = localStorage.getItem("code");
  const redirect_uri = "http://localhost:3000/#/auth"
  const response_type = "code"
  const state_value = "placeholder state"
  const nonce_value = "placeholder nonce"
  const AUTH_URL = `https://id.worldcoin.org/authorize?client_id=${app_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&state=${state_value}&nonce=${nonce_value}`
  const [info, setInfo] = useState({});
  const handleAuth = async () => {
    const client_id = "app_staging_e65a6e24ba4f9f99ce1c64aa1aa38fbf";
    const client_secret = "sk_bac953490e78e30066d5f646a44478ec8e263d62d4a7d2e4";
    const data = new URLSearchParams();
    data.append('code', "placeholder code");
    data.append('grant_type', 'authorization_code');
    fetch('https://id.worldcoin.org/token', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      setInfo(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    })
  }
  useEffect(() => {
    console.log("info", info);
  }, [info])
  return (
    <div>
      Auth
      <IDKitWidget
        app_id="app_staging_e65a6e24ba4f9f99ce1c64aa1aa38fbf" // obtain this from developer.worldcoin.org
        action="my_action"
        enableTelemetry
        onSuccess={result => console.log(result)} // pass the proof to the API or your smart contract
      />
      <a href={AUTH_URL} className="btn">Authenticate</a>
      <button onClick={handleAuth} className="btn">HandleAuth</button>
    </div>
  )
}
