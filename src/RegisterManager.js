import React, { useState } from "react";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterManager() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(user);
      alert("successfully created an account");
      if (auth) {
        navigate("/admin");
      }
    } catch (error) {
      alert(error.message);
      alert("please try again an error occured maybe you are offline");
    }
  };

  return (
    <div className="login">
      <div className="login-content-holder">
        <div className="login-header">
          <img
            className="login_logo w-25"
            src="./images/shop_black.png"
            alt=""
          />
          <div className="login-header-text">
            <h1 className="h1 py-2">Create your Account Dear Manager</h1>
          </div>
        </div>

        <div className="login-body w-lg-25 w-md-50">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label for="floatingPassword">Password</label>
          </div>

          <button
            onClick={register}
            type="submit"
            className="btn btn-primary my-3 login_btn"
          >
            Register
          </button>
        </div>
        <div className="login-footer">
          <p>
            By Registering you agree to our terms and conditions of Use and
            sales. Please visit our Privacy and Policy page to know more
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterManager;
