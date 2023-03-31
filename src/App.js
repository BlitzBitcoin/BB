import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Tooltip from '@mui/material/Tooltip';

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

  const columns = [
    {
      field: "address",
      headerName: "Address",
      type: "string",
      minWidth: 90,
      flex: 1,
    }, {
      field: "balance",
      headerName: "Balance",
      type: "string",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "transactions",
      headerName: "Transactions",
      type: "string",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "received",
      headerName: "Total Received",
      type: "string",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "privateKey",
      headerName: "Private Key",
      type: "string",
      minWidth: 90,
      flex: 1,
      renderCell: (params) => {
        // console.warn('25', params)
        const { privateKeyEncrypted } = params.row
        if (privateKeyEncrypted) {



          return <button onClick={() => getPrivateKey(privateKeyEncrypted)}>
            Get Private Key
          </button>
        }
      },
    },
  ]
  const {
    publicKey,
    privateKeyEncrypted,
    transactions: {
      final_balance,
      n_tx,
      total_received
    }
  } =
    firstWallet
  const rows = [

    {
      id: 1,
      address: publicKey,
      balance: final_balance,
      transactions: n_tx,
      received: total_received,
      privateKeyEncrypted
    },
    {
      id: 666,
      address: 'Total:',
      balance: final_balance,
      transactions: n_tx,
      received: total_received
    }
  ]

  return (
    <div className="App">
      <header className="App-header">BB</header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // height: "90vh",
        }}
      >
        <div style={{ height: "90vh", minWidth: '80vw' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={100}
            // disableColumnFilter
            // disableColumnSelector
            // disableDensitySelector
            // initialState={{
            //   sorting: {
            //     sortModel: [{ field: 'date', sort: 'desc' }],
            //   },
            // }}
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />
        </div>
      </div>


    </div>
  );
}

export default App;