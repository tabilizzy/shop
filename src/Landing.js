import React from 'react'
import {useNavigate } from "react-router-dom";


function Landing() {
  const Navigate = useNavigate();


  return (
    <div>

      <h3>you are welcome to the Shop PLatform</h3>
      <p><button>Have access to those </button>
      <button onClick={e => Navigate("/register")}>click to Register</button> </p>
      <p><button>Are you a manager </button>
      <button onClick={e => Navigate("/loginManger")}>click to Login to the dashbord</button> </p>
    </div>
  )
}

export default Landing

