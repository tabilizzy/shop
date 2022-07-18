import React from 'react'
import { useStateValue } from './StateProvider'

function Details() {
    const [{ user }, dispatch] = useStateValue();

  return (
    <div className="checkout container">
      

      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-12">
              <div className="card mt-2 bg-light my-3">
                <div className="card-body">
                  <div className="h6">Hello , {user?.email}</div>
                  <div className="h4">Your are welcome to the Dashbord</div>
                </div>
              </div>
            </div>


            <div className="col-12">
              <div className="card mt-2 my-3 p-5">
              
                  <h5> To have access to the live chart and messages</h5>
                  <button type="submit" 
                          style={{ backgroundColor: "#f0c14b" }}

                  onclick= {(e) => { window.location.href = 'https://dashboard.tawk.to/#/chat';}}
                  >click here</button>
                  
              </div>
            </div>
          </div>

        </div>
        <div className="col">
          <div className="mt-2">
          </div>
        </div>
      </div>
 

    </div>
  )
}

export default Details