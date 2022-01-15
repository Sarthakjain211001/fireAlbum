import React,{useEffect} from 'react'
import {getAuth,
    onAuthStateChanged,
signInWithEmailAndPassword
} from 'firebase/auth'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import loader from '../images/loaderImg.gif'

const Login = ({currUser, setCurrUser}) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const auth = getAuth();
    
    useEffect(() => {        
        document.getElementById("Loader").style.display="block";  //When the page loads we will show the loader. If auth state changes then if currentuser is not present then disappear the loader( code written in onAuthStateChanged).
        document.getElementById("loginBtn").disabled= true  ;
        document.getElementById("loginBtn").style.cursor= "not-allowed" ;
        
    }, [])
   
    onAuthStateChanged(auth, (currentUser)=>{  //whenver the state of auth will change this will run. i.e if a user logs in or logs out or a persisted state is present . It's like useEffect().
        setCurrUser(currentUser);
         
        if(!currentUser){
            document.getElementById("Loader").style.display="none";
            document.getElementById("loginBtn").disabled= false  
        document.getElementById("loginBtn").style.cursor= "pointer"
        
        }
        
    })

    
    const handleLogin=(e)=>{
        e.preventDefault();
        document.getElementById("loginBtn").disabled= true  //when user clicks on login button then show the loader and change the button style
        document.getElementById("loginBtn").style.cursor= "not-allowed"
        document.getElementById("Loader").style.display="block";
        signInWithEmailAndPassword(auth, email, password)
        .then((credential)=>{            
                          //After succresssful login ; firebase will login the user. His details will get saved in auth.currentUser. onAuthStateChanged will run and it will setCurrUser
                                          //It is persistant i.e it will remain saved even after the user refreshes the page.
        }).catch((err)=>{
            document.getElementById("Loader").style.display="none";  //if error occurs then disappear the loader and bring the button back to normal
            document.getElementById("loginBtn").disabled= false;
            document.getElementById("loginBtn").style.cursor= "pointer"
            document.getElementById('showError').innerHTML=err.message
        });        
        
    }
    
    return (
        <div className='login'>
            <div className='title'>
                <h1>FireAlbum</h1>
            </div>
            <h3 style={{'textAlign':'center', 'marginBottom':'50px', "marginTop":"100px"}}>Login to your account</h3>
            <form>
                Email<br/>
                <input placeholder='email' type='email' onChange={(e)=> setEmail(e.target.value)}/><br/><br/>
                Password<br/>
                <input placeholder='password' type='password' onChange={(e)=> setPassword(e.target.value)}/><br/><br/>
                <button type='submit' id="loginBtn" onClick={handleLogin}>Login</button>
            </form>
            <br/>
            
            <p style={{'textAlign':'center', 'fontSize':'15px'}}>Don't have an account? <Link to="/signup">Register</Link></p>
            <p style={{'textAlign':'center', 'fontSize':'12px', 'color':'red'}} id="showError"></p>
            <div className='loader' id="Loader">
            <img className='loaderImg' src={loader} />
            </div>
        </div>
    )
}

export default Login
