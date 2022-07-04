import React, { useState, useEffect } from "react";
import "./css/Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [totalCost, setTotalCost] = useState("0");
  const Navigate = useNavigate();

  function storeData(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Great Soppo</p>
            <p>Buea, South West</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                catergory={item.catergory}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => {
                  setTotalCost(value);
                  return <h3>Order Total: {value}</h3>;
                }}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"frs"}
              />
               
              <button
                onClick={(e) => {
                  let memo = "Shop Purchase";
                  let s_url = "http://localhost:3000/orders";
                  let c_url = "http://localhost:3000/orders";
                  let url = `https://zitopay.africa/sci/?currency=XAF&amount=${totalCost}&receiver=awakedom&memo=${memo}&success_url=${s_url}&cancel_url=${c_url}`;
                  storeData(basket);
                  window.location.href = url;
                  console.log("This is me", url);
                }}
              >
                buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
