import React from "react";
// import "./css/Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  console.log(basket, "basket");

  return (
    <div className="checkout container">

      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-12">
              <div className="card mt-2 bg-light my-3">
                <div className="card-body">
                  <div className="h6">Hello , {user?.email}</div>
                  <div className="h4">Your Shopping Basket</div>
                </div>
              </div>
            </div>


            <div className="col-12">
              <div className="card mt-2 my-3 p-5">
                {basket.map((item) => { 
                  return (

                    <div className="card mt-2 my-3 bg-light"> 
                      <CheckoutProduct
                        id={item.id}
                        catergory={item.catergory}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                      />
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

        </div>
        <div className="col">
          <div className="mt-2">
            <Subtotal />
          </div>
        </div>
      </div>
 

    </div>
  );
}

export default Checkout;
