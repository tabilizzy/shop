import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "./firebase";

function View() {
  const [existingCategories, setExistingCatgories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

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

  function deleteItem(data) {
    firestore.collection("categories").doc(choosenCategory).collection("items").doc(data.id).delete().then(() => {
      console.log("Document successfully deleted!");
      alert('item deleted');
    }).catch(error => {
      console.log("Error removing document: ", error);
      alert('error deleting item');
    });
  }

  function deleteCategory(category) {
    let temp = existingCategories.filter(item => item.name.toLocaleLowerCase() !== category);
    setExistingCatgories(temp);
    setChoosenCategory(existingCategories[0].name.toLowerCase());
    firestore.collection("categories").doc(choosenCategory).delete().then(() => {
      console.log("Document successfully deleted!");
      alert('category deleted');
    }).catch(error => {
      console.log("Error removing document: ", error);
      alert('error deleting category');
    });
  }

  function editItem(data) {
    navigate("/edit",{state:data})
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="h6 pt-5 pb-2">Categories
          <span className="float-end btn btn-danger btn-sm" onClick={() => deleteCategory(choosenCategory)}> Delete {choosenCategory}</span></div>
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
                <div className="card mb-3">
                  <img src={item.image} className="card-img-top" alt="" />
                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <h3 className="card-title fw-bold">
                      {Number(item.price).toLocaleString()}{" "}
                      <span className="fs-6 fw-normal text-muted">frs</span>
                    </h3>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{item.rating}</small>
                    </p>
                    <button className="float-end btn btn-sm btn-danger" onClick={() => deleteItem(item)}>Delete</button>
                    <button className="float-end btn btn-sm btn-success me-2" onClick={()=>{editItem(item)}}>Edit</button>
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
