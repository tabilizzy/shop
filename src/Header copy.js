import React, { useState } from "react";
import "./css/Header.css";
import { auth } from "./firebase";
import { SearchOutlined, ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signout } from "firebase/auth";

import { useStateValue } from "./StateProvider";

function HeaderNew() {
  const [{ basket }, dispatch] = useStateValue();

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
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img 
          src="./images/shop.png"
            alt=""
            width="30"
            height="24"
            class="d-inline-block align-text-top"
         />
          shop
        </a>
      </div>
    </nav>
  );
}

export default HeaderNew;
