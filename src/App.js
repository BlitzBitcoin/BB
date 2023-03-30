import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";

function App() {

  const [wallets, setWallets] = useState({})

  // fetch("https://blockchain.info/balance?cors=true&active=1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m")
  //   .then((response) => response.json())
  //   .then((data) => setWallets(data));
  // setWallets({"1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m":{"final_balance":0,"n_tx":29,"total_received":232535925}})

  const walletData ={
    
  }
  
  localStorage.setItem("1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m", {"1JPbzbsAx1HyaDQoLMapWGoqf9pD5uha5m":{"final_balance":0,"n_tx":29,"total_received":232535925}});

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