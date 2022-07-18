import React from "react";
import { useState } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";



function Phone() {
  const countryCode = "+237";
  const [phoneNumber, setPhoneNumber] = useState(countryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();


  const generaterecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        // size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 9) {
      setExpandForm(true);
      generaterecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error, "there is an error");
        });
    }
  };

  const verifyOTP = (e)=>{
    let otp = e.target.value;
    setOTP(otp);
    if(otp.length === 6){
      console.log(otp)
      let confirmationResult= window.confirmationResult;
      confirmationResult.confirm(otp).then((result) =>{
        const user = result.user;
        console.log(user)
      }).catch((error)=>{

      });
    }

  }

  return (
    <div className="login">
    <div className="login-content-holder">
      <img className="login_logo w-25" src='./images/shop_black.png' alt=''/>
      <form onSubmit={requestOTP}>
        <h1 className="login-header-text h1 py-2">Sign in with phone number</h1>
        <div className="mb-3">
          <label htmlFor="phoneNumberInput" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumberInput"
            aria-describedby="emailHelp"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div id="phoneNumberHelp" className="form-text">
            Please enter your phone number
          </div>
        </div>
        {expandForm === true ? (
          <>
            <div className="mb-3">
              <label htmlFor="otpInput" className="form-label">
                OTP
              </label>
              <input type="number" className="form-control" id="otpInput" value={OTP} onChange={verifyOTP} />
              <div id="otpHelp" className="form-text">
                Please enter the one time pin sent to your phone
              </div>
              <button className="btn btn-primary my-3 login_btn"  onClick={(e)=>{
                  navigate("/home");
      }}>confirm</button>
            </div>
          </>
        ) : null}
        {expandForm === false ? (
          <button type="submit" className="btn btn-primary my-3 login_btn">
            Request OTP
          </button>
        ) : null}
        <div id="recaptcha-container"></div>
      </form>
    </div>
    </div>
  );
}

export default Phone;
