import React, { useEffect, useState } from "react";
import "./css/Home.css";
import { firestore } from "./firebase";
import { useStateValue } from "./StateProvider";

function Home() {
  const [existingCategories, setExistingCatgories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState("");
  const [items, setItems] = useState([]);

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = (item) => {
    const { id, image, name, price, description, rating } = item;
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      items: {
        id: id,
        name: name,
        image: image,
        price: price,
        description: description,
        rating: rating,
      },
    });
  };

  function fetchCategories() {
    firestore.collection("categories").onSnapshot((snap) => {
      let docs = snap.docs.map((doc) => doc.data());
      setExistingCatgories(docs);
      console.log(docs[0].name);
      setValues(docs[0].name.toLowerCase());
    });
  }

  function displayData(catergory) {
    firestore
      .collection("categories")
      .doc(catergory)
      .collection("items")
      .onSnapshot((snap) => {
        let docs = snap.docs.map((doc) => doc.data());
        setItems(docs);
      });
  }

  function setValues(category) {
    setChoosenCategory(category);
    displayData(category);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="h6 pt-5 pb-2">Categories</div>
        <div className="row overflow-scroll">
          {existingCategories.map((cat, index) => {
            return (
              <div
                className="col-2"
                key={index}
                onClick={() => setValues(cat.name.toLowerCase())}
              >
                <div className="btn btn-outline-primary">{cat.name}</div>
              </div>
            );
          })}
        </div>
        <hr />

        <div className="row">
          <div className="h3 pt-2 pb-1">{choosenCategory}</div>
          {items.map((item, index) => {
            return (
              <div className="col-md-6" key={index}>
                <div className="card mb-4">
                  <img src={item.image} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <h3 className="card-title fw-bold">
                      {Number(item.price).toLocaleString()}{" "}
                      <span className="fs-6 fw-normal text-muted">frs</span>
                    </h3>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {/* {item.rating} */}
                        {/* { 
                        Array.from(Array(item.rating))
                          .keys()
                          .map((_, i) => {
                            console.log(item.rating)
                           return <p key={i}>⭐</p>
                          })} */}

                          {
                            Array.from(Array(item.rating)).map((_,i)=>{

                              return <p key={i}>⭐</p>
                            })
                          }
                      </small>
                    </p>
                    <button className="btn-sm btn btn-primary" onClick={() => addToBasket(item)}>
                      Add to Basket
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
