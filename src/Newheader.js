import React from 'react'
import "./css/Newheader.css";
import { Link } from "react-router-dom";


function Newheader() {
  return (
    <div className='main'>
        <img className="main_logo" src="./images/shop.png" alt="" />
        <div className='main_nav'>
            <Link to="/upload">
            <div className='main_option'>
                <div className='upload'>upload</div>
            </div>
            </Link>
            <div className='main_option'>
                <div className='details'>Product Details</div>
            </div>
        </div>

    </div>
  )
}

export default Newheader