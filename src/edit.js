import React, { useEffect, useState } from "react";
import "./css/upload.css";
import { firestore, storage } from "./firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useLocation } from "react-router-dom";

function Edit() {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [existingCategories, setExistingCatgories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState({})
  const location = useLocation();

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };

  function uploadProduct(category, product) {
    console.log("clicked");
    if (selectCategory) {
      setLoading(true);

      // create new category

      firestore
        .collection("categories")
        .doc(category.name.toLocaleLowerCase())
        .set(category)
        .then(() => {
          const storage = getStorage();
          const pathReference = ref(
            storage,
            `images/${product.name}/${Date.now()}.png`
          );

          uploadBytes(pathReference, file).then((snapshot) => {
            getDownloadURL(ref(storage, snapshot.ref)).then((url) => {
              console.log(url);

              product.image = editItem.image || url;
              firestore
                .collection("categories")
                .doc(category.name.toLowerCase())
                .collection("items")
                .doc(editItem.id)
                .set(product)
                .then(() => {
                  alert("Operation Successful");
                  setLoading(false);
                })
                .catch((e) => {
                  console.log(e);
                  alert("Operation Failed");
                });
            });
          });
          console.log("end of click");
        })
        .catch((e) => {
          console.error(e);
          alert("Operation failed");
        });
    } else {
      //update existing category
      setLoading(true);

      const storage = getStorage();
      const pathReference = ref(
        storage,
        `images/${product.name}/${Date.now()}.png`
      );

      uploadBytes(pathReference, file).then((snapshot) => {
        console.log(snapshot);
        setLoading(false);
        console.log("end of click");

        getDownloadURL(ref(storage, snapshot.ref)).then((url) => {
          product.image = url;

          firestore
            .collection("categories")
            .doc(category.name.toLowerCase())
            .collection("items")
            .doc(editItem.id)
            .update(product)
            .then(() => {
              alert("Operation Successful");
            })
            .catch((e) => {
              console.log(e);
              alert("Operation Failed");
            });
        });
      });
    }
  }

  function fetchCategories() {
    firestore.collection("categories").onSnapshot((snap) => {
      let docs = snap.docs.map((doc) => doc.data());
      setExistingCatgories(docs);
    });
  }
 

  function initializeData(data){
    setEditItem(data);
    setSelectCategory(true);
    setFileDataURL(data.image);
  }

  useEffect(() => {
    fetchCategories();
  });

  useEffect(() => {
    if(location.state){
      let temp = location.state;
      console.log(temp)
    initializeData(temp);
    }
  },[location])

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="container">
      <div className="">
        <form
          className="row g-3 pt-5"
          onSubmit={(e) => {
            let timeStamp = Date.now();
            e.preventDefault();

            let categoryData = {
              id: e.target.category.value + timeStamp,
              name: e.target.category.value,
            };

            let productData = {
              name: e.target.productName.value,
              id: e.target.productName.value + timeStamp,
              date: timeStamp,
              img: "",
              category: e.target.category.value,
              rating: e.target.ratings.value,
              price: e.target.price.value,
              description: e.target.description.value,
            };

            uploadProduct(categoryData, productData);
          }}
        >
          {selectCategory ? (
            <div className="col-md-12">
              <label className="form-label">Category</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  id="category"
                  placeholder="Category"
                  value={editItem.category}
                  onChange={(e)=>{
                    let temp = editItem;
                    temp.category = e.target.value;
                    setEditItem(temp); 
                  }}
                />
                <div
                  className="input-group-text bg-danger text-light"
                  onClick={() => {
                    setSelectCategory(false);
                  }}
                >
                  Select Category
                </div>
              </div>
            </div>
          ) : (
            <div className="col-md-12">
              <label className="form-label">Categories</label>
              <div className="input-group">
                <select
                  className="form-select"
                  id="inlineFormSelectPref"
                  name="category"
                >
                  <option selected>Choose...</option>
                  {existingCategories.map((cat, index) => {
                    return (
                      <option key={index} value={cat.name}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>

                <div
                  className="input-group-text bg-primary text-light"
                  onClick={() => {
                    setSelectCategory(true);
                  }}
                >
                  + Create Category
                </div>
              </div>
            </div>
          )}
          <div className="col-md-12">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="productName"
              id="title"
              placeholder="Product Name"
              value={editItem.name}
              onChange={(e)=>{
                let temp = editItem;
                temp.name = e.target.value;
                setEditItem(temp); 
              }}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="Description"
              name="description"
              placeholder="Product description"
              value={editItem.description}
              onChange={(e)=>{
                let temp = editItem;
                temp.description = e.target.value;
                setEditItem(temp); 
              }}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="price"
              id="price"
                value={editItem.price}
                onChange={(e)=>{
                  let temp = editItem;
                  temp.price = e.target.value;
                  setEditItem(temp); 
                }}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Ratings</label>
            <input
              type="text"
              className="form-control"
              id="ratings"
              name="ratings"
                placeholder="ratings"
                value={editItem.rating}
                onChange={(e)=>{
                  let temp = editItem;
                  temp.rating = e.target.value;
                  setEditItem(temp); 
                }}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Image</label>
            <input
              className="form-control"
              type="file"
              id="image"
              accept=".png, .jpg, .jpeg"
              onChange={changeHandler} 
            />
          </div>
          <div className="col-md-12">
            <div className="card w-auto">
              {fileDataURL ? (
                <p className="img-preview-wrapper">
                  {<img src={fileDataURL} alt="preview" className="w-lg-25" />}
                </p>
              ) : null}
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {loading ? "Uploading..." : "Upload Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
