import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';


function encryptWithAES(payload, password) {
  return AES.encrypt(payload, password).toString();
};

function decryptWithAES(payload, password) {
  const bytes = AES.decrypt(payload, password);
  const decryptedPayload = bytes.toString(Utf8);
  return decryptedPayload;
};

function App() {


  // useEffect(() => {

  //   if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //     return console.warn('DEV mode')
  //   }
  //   fetch("https://blockchain.info/balance?cors=true&active=1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m")
  //     .then((response) => response.json())
  //     .then((data) => setWallets(data));
  //   setWallets({ "1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m": { "final_balance": 0, "n_tx": 29, "total_received": 232535925 } })

  // }, [])

  const walletData = {
    "1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m": {
      publicKey: "1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m",
      privateKeyEncrypted: 'U2FsdGVkX184moMXYzj0KA24KCKWJbrQU5BHg0IiJvLThe4Ko9agGltcLtSndv58zf5AbRClIfDr0GV9jZpH3Xf0CVLcZqpuzuOCcltO7kA=',
      transactions: {
        "final_balance": 0,
        "n_tx": 29,
        "total_received": 232535925
      }
    },
  }

  const firstWallet = walletData['1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m']

  const [wallets, setWallets] = useState(walletData)

  function getPrivateKey(privateKeyEncrypted) {
    console.warn('55', privateKeyEncrypted)
    const password = prompt('Enter Password:')
    if (!password) {
      alert('Wrong Password')
      return
    }
    const key = decryptWithAES(privateKeyEncrypted, password)
    if (key) {
      alert(key)
    } else {
      alert('Wrong Password')
    }
  };


  localStorage.setItem('walletData', JSON.stringify(walletData));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>{JSON.stringify(wallets)}</code> and save to reload.
        </p>
  
      </header>
    </div>
  );
}

export default App;