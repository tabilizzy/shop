import React, { useState, useEffect } from 'react';
import "./css/Orders.css";
import Order from './Order'

function Orders() {

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                    <Order/>
                
            </div>
        </div>
    )
}

export default Orders