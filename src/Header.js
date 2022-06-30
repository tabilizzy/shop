import React, { useState } from "react";
import "./css/Header.css";
import { auth } from "./firebase";
import { SearchOutlined, ShoppingBasket} from "@material-ui/icons";
  import { Link } from "react-router-dom";
import {onAuthStateChanged, signout} from "firebase/auth";

import { useStateValue } from "./StateProvider";

function Header() {
  const [{basket}, dispatch] = useStateValue();

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const handleAuthentication = async () => {
    if (user) {
      auth.signOut();
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img className="header_logo" src="./images/shop.png" alt="" />
      </Link>
      <div className="header_search">
        <input className="header_searchInput" type="text"  placeholder="search..."/>
         <SearchOutlined className="header_searchIcon" /> 

        <div className="header_nav">
          <Link to={!user && "/register"}>
            <div onClick={handleAuthentication} className="header_option">
              <span className="header_optionLineOne">
                Hello {!user ? "Guest" : user?.email}
              </span>
              <span className="header_optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          <Link to='/orders'>
          <div className="header_option">
            <span className="header_optionLineOne">Return</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
          </Link>
          <div className="header_option">
            <span className="header_optionLineOne">Your</span>
            <span className="header_optionLineTwo"> Prime</span>
          </div>
          <Link to="/checkout">
            <div className="header_optionBasket">
               <ShoppingBasket /> 
              <span
                className="header_optionLineTwo 
                        header_basketCount"
              >
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
