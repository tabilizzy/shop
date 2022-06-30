import React, {useState} from 'react'
import './css/Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "./firebase"
import {signInWithEmailAndPassword} from "firebase/auth";




function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = async (e) =>{
        //helps to prevent refreshing
        e.preventDefault();
        try{
            const user= await signInWithEmailAndPassword(auth, email, password);
            // console.log(user);
            if(auth){
                navigate("/");
            }
        } catch(error){
            alert(error.message);
        }
    }
    

  return (
    <div className='login'>
        <img className='login_logo' 
        src='./images/shop.png' alt=''
        /> 
        <div className='login_container'>
            <h1>Please Sign-in</h1>
            
            <h5>Email</h5>
            <input type= "text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <h5>Password</h5>
            <input type= "password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={signIn}
            type='submit' className='login_signIn'>
                Sign-In</button>
                <p>By sign-In you agree to our terms and 
                    conditions of Use and sales. Please visit our 
                    Privacy and Policy page to know more</p>
                    <Link to='/register'>
                    <button 
                    className='login_register'
                    >Create your Account</button>
                    </Link>
                    
        </div>
        
    </div>
  )
}

export default Login