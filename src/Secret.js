import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    if (answer ===  data ) {
      navigate("/admin");
    } else {
      alert("you are not the manager");
      return null;
    }
  }

  return (
    <div className="container">
        <h3>If you are truly the manager then you should know the catch phrase of Shop</h3>
        <h3>input the phrase and have access to the dashbord</h3>
      <input type="text" onChange={getdata} />
      <button onClick={() => setShow(true)}>Print Value</button>
      {show ? <h2>{data}</h2> : null}
      <button onClick={confirm}>Confirm</button>
    </div>
  );
}

export default Secret;
