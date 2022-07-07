import React, { useState } from "react";
import "./css/Header.css";
import { auth } from "./firebase";
import { ShoppingBasket } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signout } from "firebase/auth";

import { useStateValue } from "./StateProvider";

function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();

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
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand " href="#">
          <Link to="/home">
            <img
              src="./images/shop.png"
              alt=""
              width="100"
              //height="24"
              class="d-inline-block align-text-top"
            />
          </Link>
        </a>
        <form class="w-50" role="search">
          <div className="input-group ">
            <input
              class="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />

            <div className="input-group-text search-button text-dark">
              Search
            </div>
          </div>
        </form>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">Return</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo"> Prime</span>
        </div>

        <div>
          <button className="btn">
            <div onClick={handleAuthentication} className="header_option">
              <span className="header_optionLineOne">
                Hello {!user ? "Guest" : user?.email}
              </span>
              <span className="header_optionLineTwo" onClick={e=> navigate("/")}>
                Sign Out
              </span>
              </div>
          </button>

          <button className="btn ms-3">
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
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
