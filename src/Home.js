import React from 'react'
import './css/Home.css'
import Product from './Product'


function Home() {
  return (
    <div className='home'>
      
        <div className='home__container'>
           <img
           className='home_image'
           src='./images/cloth.jpg'
            alt='openshop'/>

            <div className='home_row'>
              <Product 
              id="1"
              catergory="phone"
              title="iPhone"
              price={200}
              image= "./images/iphone.jpg"
              rating={5}
              />
              <Product 
              id="2"
              catergory="phone"
              title="Smartphone"
              price={200}
              image="./images/smartphone.jpg"
              rating={2}/>
            
            </div>
            <div className='home_row'>
            <Product 
              id="3"
              catergory="cloths"
              title="cloth"
              price={200}
              image="./images/cloth1.jpg"
              rating={1}/>
              <Product 
              id="4"
              catergory="cloths"
              title="Best cloth"
              price={200}
              image="./images/cloth2.jpg"
              rating={4}/>
              <Product 
              id="5"
              catergory="cloths"
              title="dress"
              price={200}
              image="./images/cloth3.jpg"
              rating={5}/>
            </div>
            <div className='home_row'>
            <Product 
              id="6"
              catergory="food"
              title="food"
              price={200}
              image="./images/food1.jpg"
              rating={5}/> 
              
            </div>
        </div>

        
    </div>
  )
}

export default Home