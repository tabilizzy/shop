import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Checkout from "./Checkout";
import React, { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Payment from "./Payment";
import Orders from "./Orders";
import Newheader from "./Newheader";
import View from "./View";
import Upload from "./Upload";
import Header from "./Header";
import Alan from "./components/Alan";
import Edit from "./edit";
import RegisterManager from "./RegisterManager";
import Details from "./Details";
import Landing from "./Landing";
import Secret from "./Secret";
import LoginManager from "./LoginManager";
import Phone from "./Phone";
import VideoBackgroundPage from "./new";

function App() {
  Alan();
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
        <Route
            path="/new"
            element={
              <>
                <VideoBackgroundPage />
              </>
            }
          />
        <Route
            path="/phone"
            element={
              <>
                <Phone />
              </>
            }
          />
          <Route
            path="/secret"
            element={
              <>
                <Secret />
              </>
            }
          />
           <Route
            path="/loginManger"
            element={
              <>
                <LoginManager />
              </>
            }
          />
          <Route
            path="/registerManger"
            element={
              <>
                <RegisterManager />
              </>
            }
          />

          <Route
            path="/register"
            element={
              <>
                <Register />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/details"
            element={
              <>
                <Newheader />
                <Details />
              </>
            }
          />
          <Route
            path="/upload"
            element={
              <>
                <Newheader />
                <Upload />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <Newheader />
                <View />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />

          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Payment />
              </>
            }
          />

          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />

          <Route
            path="/edit"
            element={
              <>
                <Newheader />
                <Edit />
              </>
            }
          />

          <Route
            exact
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Landing />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
