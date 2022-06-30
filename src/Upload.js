import React from "react";
import "./css/upload.css";

function Upload() {
  return (
    <div className="container">
      <div className="container-fluid">
        <form class="row g-3 pt-5">
          <div class="col-md-6">
            <label for="category" class="form-label">
              Category
            </label>
            <input type="text" class="form-control" id="category" />
          </div>
          <div class="col-md-6">
            <label for="title" class="form-label">
              Product Name
            </label>
            <input type="text" class="form-control" id="title" />
          </div>
          <div class="col-12">
            <label for="Description" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              class="form-control"
              id="Description"
              placeholder="Product description"
            />
          </div>
          <div class="col-md-3">
            <label for="price" class="form-label">
              Price
            </label>
            <input
              type="number"
              class="form-control"
              name="price"
              placeholder="price"
              id="price"
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              State
            </label>
            <select id="inputState" class="form-select">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
          <div class="col-md-2">
            <label for="inputZip" class="form-label">
              Zip
            </label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
