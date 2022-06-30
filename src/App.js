
import './App.css';

import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from './Login';
import Register from './Register';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import {auth} from "./firebase"
import Payment from './Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders';
import Newheader from './Newheader';
import View from './View';
import Upload from './Upload';

const promise = loadStripe(
  "pk_test_51LBKSvF3b97fkgH1NL06cXGoraMh8i627gtjXtHksuFWTF332QbHK4RiiwFphaFTNlC3B65K7kp9Wbdpw2H0Bhv100uE37QIbM");

function App() {

  const [{}, dispatch] = useStateValue();
  // will only run once when the app component loads...

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM
    <Router>
      <div className="app">
        
           <Routes>
             <Route path='/register'
             element={
               <><Register/></>
             }
             />
             <Route path="/login"
             element={

               <> <Login/></>
             }
             />
             <Route path="/upload"
             element={

               <> <Newheader/>
               <Upload/></>
             }/>
             <Route path="/header"
             element={

               <> <Newheader/>
               <View/></>
             }/>
               <Route path='/orders'
             element={
               <> <Header/>
               <Orders/></>
             }
             />  

              <Route path='/payment'
                element= {
                 <><Header/>
                 <Elements stripe={promise}>
                   <Payment/> 
                 </Elements>
                 </>
                     }
               /> 

              <Route path='/checkout'
                element= {
                 <><Header/>
                 <Checkout/></>
                     }
               />

              <Route exact  path='/'
                element= {
                  <><Header/>
                     <Home /></>
                     }
              />
          
           </Routes>
      
      </div>
    </Router>
  );
}

export default App;
