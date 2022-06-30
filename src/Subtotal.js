import React from "react";
import "./css/Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

import {useNavigate} from "react-router-dom";
//import StripeCheckout from "react-stripe-checkout";


function Subtotal() {
  const Navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();

  console.log(basket, "This is basket");

  // async function handleToken(token){
      
  // }

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        suffix={"frs"}
      />
      <button onClick={e =>Navigate("/payment")}>Proceed to Checkout</button>
      {/* <StripeCheckout
        stripeKey="pk_test_51LBKSvF3b97fkgH1NL06cXGoraMh8i627gtjXtHksuFWTF332QbHK4RiiwFphaFTNlC3B65K7kp9Wbdpw2H0Bhv100uE37QIbM"
        token={handleToken}
        
      /> */}
    </div>
  );
}

export default Subtotal;
