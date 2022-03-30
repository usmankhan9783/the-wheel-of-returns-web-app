import React, { useState } from "react";
import { useSelector } from "react-redux";
import { connectWallet } from "../../utils/web3-helper";
import Logo from "./../../assets/images/logo.png";
import './header.scss'

function Header() {
  const state = useSelector(state=>state?.web3Reducer)
  const [isNavOpen, setIsNavOpen] = useState(false);

  function handleNavbar() {
    if (isNavOpen) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(true);
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <a href="#" className="brand-logo">
            <img className="img-responsive" src={Logo} />
          </a>

          <button
            id="navbar-toggler"
            className={`navbar-toggler ${!isNavOpen ? "collapsed" : ""}`}
            type="button"
            onClick={handleNavbar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`navbar-container ${isNavOpen ? "show" : ""}`}>
            <div className="navbar-wrapper">
              <nav className="navbar">
                <ul className="nav-links">
                  <li className="item">
                    <a href="#investment">Investment</a>
                  </li>
                  <li className="item">
                    <a href="#withdrawal">Withdrawal</a>
                  </li>
                  <li className="item">
                    <a href="#contract">Contract</a>
                  </li>
                  <li className="item">
                    <a href="#referral">Referral</a>
                  </li>
                  <li className="item">
                    <a href="#deposits">Deposit</a>
                  </li>
                </ul>
                <div className="action-btn">
                  <a className="spin-btn">
                    Join Telegram
                  </a>
                  {state?.userAddress?(
                    <button className="spin-btn">
                    {state?.userAddress?.replace(
										  state?.userAddress?.substring(5, 38),
										  '***'
									  )}
                  </button>
                  )
                  :
                  (
                    <button className="spin-btn" onClick={()=>connectWallet()}>
                    Connect
                  </button>
                  )
                  }
                  
                  
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;