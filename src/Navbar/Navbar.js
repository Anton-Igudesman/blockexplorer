import { Route, Switch } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({Link}) {
    return (
        <nav className="navbar navbar-light">
        <ul className="navlist">
          <li>
            <Link className="navlink" to="/">Wallet Transactions</Link>
          </li>
          <li>
            <Link className="navlink" to="/transactions">Wallet Balance</Link>
          </li>
          <li>
            <Link className="navlink" to="/latest-block-info">Latest Block Info</Link>
          </li>
        </ul>
      </nav>
    )
}