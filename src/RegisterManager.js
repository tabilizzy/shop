import React, { useState } from "react";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterManager() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");


  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password, firstname, lastname);
      // console.log(user);
      alert("successfully created an account")
      if (auth) {
        navigate("/header");
      }
    } catch (error) {
      alert(error.message);
      alert("please try again an error occured maybe you are offline")
    }
  };

  return (
    <div className="login">
      <img className="login_logo" src="./images/shop.png" alt="" />

      <div className="login_container">
        <h1>Create your Account</h1>

        <h5>First Name</h5>
        <input type="text" required
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
        }}
        />

        <h5>Last Name</h5>
        <input type="text" required
        value={lastname}
        onChange={(e) => {
          setLastname(e.target.value);
        }}
        />

        <h5>Email</h5>
        <input
          type="text" required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h5>Password</h5>
        <input
          type="password"
          value={password} required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={register} type="submit" className="login_signIn">
          SignIn
        </button>
        <p>
          By Registering you agree to our terms and conditions of Use and sales.
          Please visit our Privacy and Policy page to know more
        </p>
      </div>
    </div>
  );
}

export default RegisterManager;
