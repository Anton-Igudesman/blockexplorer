import { Alchemy, AlchemySubscription } from 'alchemy-sdk';
import { useState } from 'react';



export default function LatestBlock({network, setNetwork, handleNetworkChange}) {
    const [transaction, setTransaction] = useState(null)

    const config = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network
    };

    const alchemy = new Alchemy(config);

    alchemy.ws.on(
        {method: AlchemySubscription.MINED_TRANSACTIONS},
        (tx) => console.log(tx)
    )
    return (
        <div>
              <h1>Latest Block Info</h1>
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
             {transaction && 'You have transactions'} 
        </div>
      
    )
}