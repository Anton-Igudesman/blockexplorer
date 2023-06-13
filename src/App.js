import { Alchemy, Network, Wallet, Utils, AlchemySubscription } from 'alchemy-sdk';
import { Link, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Transactions from './Transactions/Transactions';
import Ticker from './Ticker/Ticker';
import LatestBlock from './LatestBlock/LatestBlock';
import './App.css';

import crypto from './utils/data.json';



export default function App() {

  function handleChange(event) {
    const {name, value} = event.target;
    setWallet(value)
    console.log(value)
}
  const [network, setNetwork] = useState("");
  const [blockNumber, setBlockNumber] = useState();
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [configs, setConfigs] = useState({
    apiKey: null,
    privateKey: null,
    network: null
  })

  const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    privateKey: process.env.REACT_APP_PRIVATE_KEY,
    network: Network.ETH_SEPOLIA,
  };
  
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
  const COIN_LAYER_API = process.env.REACT_APP_COIN_LAYER_API_KEY;
  
  
  
  
  
  
  // In this week's lessons we used ethers.js. Here we are using the
  // Alchemy SDK is an umbrella library with several different packages.
  //
  // You can read more about the packages here:
  //   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
  const alchemy = new Alchemy(config);
  
  

    
    
  
    //const cryptoArray = Array.from(Object.entries(crypto))
    
    function handleNetworkChange(event) {
      const {name, value} = event.target;
      console.log(value)
      setNetwork(value);
      
  }
    
    useEffect(() => {
      async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber('latest'));
      }
  
      getBlockNumber();
    });
    
    // async function getWallet() {
    //   const wallet = await new Wallet(PRIVATE_KEY, alchemy)
    //   setWallet(wallet);
    //   const promise = await wallet.alchemyProviderPromise;
  
      
    //   return wallet
    // }
  
    
      
    
  
    // async function getBalance() {
    //   const balanceObj = await alchemy.core.getBalance(wallet.address, 'latest')
      
    //   const balance = balanceObj._hex
    //   setBalance(balance);
      
    // }
  //console.log('wallet', wallet, 'balance', Number(balance))
  //let formattedBalance = Utils.formatEther(balance);
  return (
    <div>
      <Ticker />
      <Navbar 
        Link={Link}
      />
      <div className="App">
         Current Block Number: {blockNumber}
        </div>
      <Route exact path="/">
        <Home 
          wallet={wallet}
          setWallet={setWallet}
          handleChange={handleChange}
        />
      </Route>
      <Route exact path="/transactions">
        <Transactions 
          wallet={wallet}
          setWallet={setWallet}
          handleChange={handleChange}
          handleNetworkChange={handleNetworkChange}
          network={network}
          setNetwork={setNetwork}
        />
      </Route>
      <Route exact path="/latest-block-info">
        <LatestBlock 
          network={network}
          setNetwork={setNetwork}
          handleNetworkChange={handleNetworkChange}
        />
      </Route>
      {/* <div className="main-container"> */}
        
        
        {/* <div>
          <h3>Get Wallet Information</h3>
         { wallet?.address && <div>{wallet.address}</div>}
         <input type="password" name="privateKey" value="privateKey" onChange={handleChange}/>
         <input 
          type="button" 
          value="click for wallet" 
          onClick={getWallet}
          />
        </div>
        
        <input type="button" value="click for balance" onClick={getBalance}/>
      </div> */}
   
    </div>
  )
    
    
}


