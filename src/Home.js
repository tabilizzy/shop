import React, { useEffect, useRef, useState } from "react";
import "./css/Home.css";
import { firestore } from "./firebase";
import { useStateValue } from "./StateProvider";

function Home() {
  const [existingCategories, setExistingCatgories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState("");
  const [items, setItems] = useState([]);
  const [_items, set_Items] = useState([]);
  const searchInputRef = useRef(null);

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
        set_Items(docs);
      });
  }

  function setValues(category) {
    setChoosenCategory(category);
    displayData(category);
  }

  function searchValues(data){
    let tempItems =  _items;
    if(data !== ""){ 
      let temp = tempItems.filter(item => item.name.toLowerCase().includes(data.toLocaleLowerCase()));
      setItems(temp)
    }else{
      setItems(tempItems);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="h6 pt-5 pb-2">Categories</div>
        <div className=" d-flex overflow-scroll">
          {existingCategories.map((cat, index) => {
            return (
              <div
                className=" px-2"
                key={index}
                onClick={() => setValues(cat.name.toLowerCase())}
              >
                <div className="btn btn-outline-primary">{cat.name}</div>
              </div>
            );
          })}
        </div> 
        <div className="pb-5"></div>
        <div className="row">
          <div className="h3 pt-2 pb-1 text-capitalize">{choosenCategory}</div>

          <div className="input-group mb-5">
            <input class="form-control" type="search" placeholder={"Search " + choosenCategory} aria-label="Search" onChange={(e)=>{searchValues(e.target.value)}} ref={searchInputRef} />

            <div
              className="input-group-text search-button text-dark"
              onClick={()=>{searchValues(searchInputRef.current.value)}}
            >
              Search
            </div>
          </div>
          {items.map((item, index) => {
            return (
              <div className="col-md-3" key={index}>
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
