import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/secret.css";

function Secret() {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  function getdata(val) {
    setData(val.target.value);
    setShow(false);
    console.log(val.target.value, "this is me ");
  }

  function confirm() {
    const answer = "para";
    if (answer === data) {
      navigate("/admin");
    } else {
      alert("you are not the manager");
      return null;
    }
  }

  return (
    <div className="">
      <img className="home_image" src="./images/cloth.jpg" alt="openshop" />
      <div className="pt-5 text-center">
        <h4>
          If you are truly the manager then you should know the catch phrase of
          Shop <br></br>input the phrase and have access to the dashbord
        </h4>
        <div className="pt-5"></div>
        <input type="text" onChange={getdata} />
        {/* <button onClick={() => setShow(true)}>Print Value</button> */}
        {show ? <h2>{data}</h2> : null}
        <button
          className="btn btn-outline-primary text-dark login_btn"
          onClick={confirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Secret;
