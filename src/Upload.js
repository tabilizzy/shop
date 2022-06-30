import React from 'react'
import "./css/upload.css";

function Upload() {
  return (
    <div className='upload'>
        <form>

      <div className='upload_category'>
        <h3>Category of the Product</h3>
        <input type="text" placeholder='category'/>
      </div>
      <div className='upload_title'>
        <h3>Title of the Product</h3>
        <input type="text" placeholder='title'/>
      </div>
      <div className='upload_detail'>
      <textarea name='message' row='4'/>
        <input type="text" placeholder='description'/>
      </div>
      <div>
        <h4>upload product image</h4>
      </div>
      </form>
      <button>submit</button>
    </div>

  )
}

export default Upload
