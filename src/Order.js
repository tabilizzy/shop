import React from 'react'
import "./css/order.css";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";

function Order({ order }) {

    const [{basket, user}, dispatch] = useStateValue();


    return (
        <div className='order'>
            <h2>Order</h2>
            <p className="order__id">
            </p>
            {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                catergory={item.catergory}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                hideButton
                            />
                        ))}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className="order__total">Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"frs"}
            />   
        </div>
    )
}

export default Order