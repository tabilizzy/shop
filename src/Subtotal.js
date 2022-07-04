import React from "react";
import "./css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

import { useNavigate } from "react-router-dom";
//import StripeCheckout from "react-stripe-checkout";


function Subtotal() {
  const Navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  console.log(basket, "This is basket");

  // async function handleToken(token){

  // }

  return (
    <div className="card">
      <CurrencyFormat
        renderText={(value) => (
          <div className="card-body">
            <h6 className="card-title">
              Subtotal({basket.length} items): {" "}
              <strong>{value}</strong></h6>
            <p className="card-text">
              This order contains a gift</p> 
          </div>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        suffix={"frs"}
      />
      <button onClick={e => Navigate("/payment")} className="btn" style={{ backgroundColor: "#f0c14b" }}>Proceed to Checkout</button>
   
    </div>
  );
}

export default Subtotal;
