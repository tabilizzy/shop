import React from 'react'
import { useStateValue } from './StateProvider'

function Details() {
    const [{ user }, dispatch] = useStateValue();

  return (
    <div>Details
        <div>
        <h3>Hello , {user?.email}. <br></br>
         You are welcome</h3>      
          </div>
    </div>
  )
}

export default Details