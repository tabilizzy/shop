import React, { useState } from "react";
import "./css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    //helps to prevent refreshing
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log(user);
      if (auth) {
        navigate("/home");
      }
    } catch (error) {
      alert(error.message);
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
            <h1 className="h1 py-2">Please Sign in</h1>
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
            onClick={signIn}
            type="submit"
            className="btn btn-primary my-3 login_btn"
          >
            Sign-In
          </button>
        </div>
        <div className="row py-1 align-items-middle justify-content-center"> 
            <div className="col-auto">
              
              <Link to="/login">
                <button
                  type="submit"
                  className="btn btn-outline-primary text-dark login_btn"
                >
                  Create your account
                </button>
              </Link>
              
            </div>
          </div>
        </div>
        <div className="login-footer">
          <p>
            By Logging in you agree to our terms and conditions of Use and
            sales. Please visit our Privacy and Policy page to know more
          </p>
        </div>
      </div>
    
  );
}

export default Login;
