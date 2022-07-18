import React from "react";
import "./css/Newheader.css";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useStateValue } from "./StateProvider";

function Newheader() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const handleAuthentication = async () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="main">
      <img className="main_logo" src="./images/shop.png" alt="" />
      <div className="main_nav">
        <Link to="/admin">
          <div className="main_option">
            <div className="view">View Page</div>
          </div>
        </Link>

        <Link to="/upload">
          <div className="main_option">
            <div className="upload">upload</div>
          </div>
        </Link>
         <Link to="/details">
          <div className="main_option">
            <div className="details"> Details</div>
          </div>
        </Link> 

          <div onClick={handleAuthentication} className="header_option">
            <span
              className="main_option"
              onClick={(e) => navigate("/")}
            >
              Sign Out
            </span>
          </div>
      </div>
    </div>
  );
}

export default Newheader;
