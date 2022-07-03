import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

function View() {
  const [existingCategories, setExistingCatgories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState("");
  const [items, setItems] = useState([]);

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
              <div className="col-md-4" key={index}>
                <div class="card mb-3">
                  <img src={item.image} class="card-img-top" alt="" />
                  <div class="card-body">
                    <h6 class="card-title">{item.name}</h6>
                    <h3 class="card-title fw-bold">
                      {Number(item.price).toLocaleString()}{" "}
                      <span className="fs-6 fw-normal text-muted">frs</span>
                    </h3>
                    <p class="card-text">{item.description}</p>
                    <p class="card-text">
                      <small class="text-muted">{item.rating}</small>
                    </p>
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

export default View;
