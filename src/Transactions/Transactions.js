import { Alchemy } from 'alchemy-sdk';
import {useState, useEffect} from 'react';

export default function Transactions({
    wallet, 
    setWallet, 
    handleChange, 
    handleNetworkChange,
    network,
    setNetwork}) {

    //const [network, setNetwork] = useState("");
    const [walletBalance, setWalletBalance] = useState(null);

    async function getBalance(address, net) {
        if (address === 'Choose your network') alert("Choose a network!")
            const config = {
                apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
                network: net
            }

        const alchemy = new Alchemy(config);
        const response = await alchemy.core.getBalance(address, 'latest');
        setWalletBalance(response._hex)
        console.log(response)
    }

    // function handleNetworkChange(event) {
    //     const {name, value} = event.target;
    //     console.log(value)
    //     setNetwork(value);
        
    // }

        //const walletAddress = '0xbBe1612E8A31dd1ae13Ac1B1746De2C4faD4e33E';
        console.log(wallet)
        console.log(network)

    return (
        <div>
            <h1>Get Your Wallet Balance</h1>
            <select 
                name="networkList" 
                id="networkList"
                onChange={handleNetworkChange}
                defaultValue="Choose your network"
            >
                <option defaultValue="Choose your network" />
                <option value="Choose your network">Choose your network</option>
                <option value="eth-mainnet">Ethereum Mainnet</option>
                <option value="eth-goerli">Ethereum Goerli</option>
                <option value="eth-sepolia">Ethereum Sepolia</option>
                <option value="polygon-mumbai">Polygon Mumbai</option>
            </select>
            <input
                type="text"
                name="wallet"
                value={wallet}
                placeholder="Enter wallet address"
                onChange={handleChange}
            />
            <input 
                type="button" 
                value="click for balance" 
                onClick={() => getBalance(wallet, network)}
            />
            {walletBalance && +walletBalance}
        </div>

        
    )
}