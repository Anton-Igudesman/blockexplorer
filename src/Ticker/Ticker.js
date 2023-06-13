import Ticker from "react-ticker";
import crypto from '../utils/data.json';
import '../App.css';

export default function TickerDisplay() {
    const cryptoArray = Array.from(Object.entries(crypto))

    return (
        <div className="ticker-wrapper">
        <Ticker>
            {({index}) => {
              const style1 = {
                color: "red",
                fontWeight: "bold"
              }
  
              const style2 = {
                color: "green",
                fontWeight: "bold"
              }
              return <div><span>|    </span><span style={style1}>    {cryptoArray[index][0]} </span><span> : </span> <span style={style2}>${cryptoArray[index][1]}     </span><span>|</span></div>
              }}
        </Ticker>
     </div>
    )

    
}