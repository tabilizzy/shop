import React from "react";
import "./css/Orders.css";
import Order from "./components/Order";

function Orders() {
  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        <Order />
      </div>
    </div>
  );
}

export default Orders;
