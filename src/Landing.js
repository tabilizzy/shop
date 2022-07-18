import React from "react";
import { useNavigate } from "react-router-dom";
// import "./css/Landing.css";

function Landing() {
  const Navigate = useNavigate();

  return (
    <div className="" style={{ backgroundColor: "transparent" }}>
            <img className="home_image" src="./images/cloth.jpg" alt="openshop" />

               
                  <h3 className="pt-5 d-flex justify-content-center align-items-center gradient">you are welcome to the Shop PLatform</h3>
                  <div className="text-center ">

            <p className="pt-5">
              <button
                type="button"
                className="btn btn-light border-white "
              >
                To begin your Shop experience
              </button>
              <button
                  className="btn btn-outline-primary text-dark login_btn"
                  onClick={(e) => Navigate("/register")}
              >
                click to Register
              </button>
            </p>
            <p className="pt-2">
              <button
                type="button"
                className="btn btn-light border border-white rounded-50"
              >
                Are you a manager
              </button>
              <button
                  className="btn btn-outline-primary text-dark login_btn"
                  onClick={(e) => Navigate("/loginManger")}
              >
                click to Login to the dashbord
              </button>{" "}
            </p>
          </div>

      <div className="row no-gutters">
        <div className="col-12 col-sm-6 col-md-8">
          
         
        </div>

        <div className="col-6 col-md-4 pt-5 ">
            {/* <img
              src="./images/look.jpg"
              alt=""
              className="text-center"
              max-height="500px"
              width="95%"
              z-index=" -1"
              margin-bottom="-150px"
            /> */}
        </div>
      </div>
      </div>
    
  );
}

export default Landing;
