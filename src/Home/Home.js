import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './Home.css'

export default function Home({wallet, setWallet, handleChange}) {

    const [transactionObject, setTransactionObject] = useState(null);
    //const [wallet, setWallet] = useState("");

    const [responseArray, setResponseArray] = useState([]);
    
    useEffect(() => {}, [responseArray, setTransactionObject])
    const networks = [
        Network.ETH_MAINNET,
        Network.ETH_GOERLI,
        Network.ETH_SEPOLIA,
        Network.MATIC_MUMBAI
    ]

    const config = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        privateKey: process.env.REACT_APP_PRIVATE_KEY,
        network: Network.ETH_MAINNET,
      };

    const alchemy = new Alchemy(config);

    //const walletAddress = '0xbBe1612E8A31dd1ae13Ac1B1746De2C4faD4e33E';

    async function getTransactions(wallet) {
        
       const array = [];

        networks.forEach(async (network) => {
            const config = {
                apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
                network
            }

            const alchemy = new Alchemy(config);

            const response = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: wallet,
                excludeZeroValue: true,
                category: ["external"]
            })
        

            const destructResponse = response.transfers;
            const networkInfo = {
                network: `${network}`,
                transactions: destructResponse
            }

            array.push(networkInfo)
            
            setResponseArray([array])
            setWallet("")
        })
      
       
    }

    // function handleChange(event) {
    //     const {name, value} = event.target;
    //     setWallet(value)
    //     console.log(value)
    // }
    //console.log('wallet', wallet)

    async function fetchTransactions(tx, network) {
    
        let config = {
            apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
            network: `${network}`
        }

        let alchemy = new Alchemy(config)
    
        let response = await alchemy.core.getTransactionReceipt(tx)

        console.log(response)
        setTransactionObject(response)

        console.log('transactionobject', transactionObject)
    }
     
    return (
        <div>
        <h3 className="search-heading">Search for Wallet Transactions on Sepolia, Goerli and Mumbai TestNets and also ETH_Mainnet</h3>
        {responseArray.length > 0 && <h4 className="search-heading">Click on a transaction to get details</h4>}
        {
        responseArray && 
        <div>
            {
              responseArray[0]?.map((response, index) => (
              <div key={index}>
                <span className="network">{response.network}</span> -
               
                {response.transactions.length > 0 ? (
                    <span> transactions: {response.transactions.map((tx, index) => (
                        <div key={index}>
                            <span className="transaction-id" onClick={() => fetchTransactions(tx.uniqueId.slice(0,-9), response.network)}>
                                Shortened ID: {tx.uniqueId.slice(0, 10)}...
                            </span>
                        <span>    Transaction Amount: ${tx.value}</span>
                        {transactionObject?.transactionHash === tx.uniqueId.slice(0,-9) && 
                            <div className="info-block">
                                <div>
                                    Block Number: {transactionObject.blockNumber}
                                </div>
                                <div>
                                    Transaction Hash: {transactionObject.transactionHash}   
                                </div>
                                <div>
                                    Gas Used: {Number(transactionObject.gasUsed._hex)}  
                                </div>
                            
                            </div>}
                        </div>
                    ))}</span>
                ): 'You have no transactions on this network'}
            </div>
              )
            ) 
        }
        </div>
    }
        <input 
            type="text" 
            placeholder="Enter your wallet address" 
            name="wallet"
            value={wallet}
            
            onChange={handleChange}
        />
        <input type="button" value="lets see some transactions" onClick={() => getTransactions(wallet)}/>
        </div>
    )
}