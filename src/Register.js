import React, { useState } from "react";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(user);
      alert("successfully created an account")
      if (auth) {
        navigate("/login");
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

        <h5>Email</h5>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <h5>Password</h5>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={register} type="submit" className="login_signIn">
          Register
        </button>
        <p>
          By Registering you agree to our terms and conditions of Use and sales.
          Please visit our Privacy and Policy page to know more
        </p>
      </div>
    </div>
  );
}

export default Register;
