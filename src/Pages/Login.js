import React from 'react'
import {getAuth,
    onAuthStateChanged,
signInWithEmailAndPassword,
signOut
} from 'firebase/auth'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({currUser, setCurrUser}) => {
const navigate = useNavigate();
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
// const [currUser, setCurrUser] = useState("")    
    
    const auth = getAuth();
    
    onAuthStateChanged(auth, (currentUser)=>{  //whenver the state of auth will change this will run. i.e if a user logs in or logs out or a persisted state is present . It's like useEffect().
        setCurrUser(currentUser);
        // currUser && navigate("/");
        // console.log(currentUser)
        // console.log(currUser);
    //    currentUser && localStorage.setItem('userId', currentUser.uid)
    //    /*currentUser &&*/ localStorage.setItem('user', currentUser.uid)
    })
    console.log(currUser);

    
    const handleLogin=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((credential)=>{
            console.log("Login success", credential.user.accessToken, credential.user.email );
            console.log(auth.currentUser) //After succresssful signup ; firebase will login the user. His details will get saved in auth.currentUser
                                          //It is persistant i.e it will remain saved even after the user refreshes the page.
        }).catch((err)=>{document.getElementById('showError').innerHTML=err.message});        
        
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
                <button type='submit' onClick={handleLogin}>Login</button>
            </form>
            <br/>
            
            <p style={{'textAlign':'center', 'fontSize':'15px'}}>Don't have an account? <Link to="/signup">Register</Link></p>
            <p style={{'textAlign':'center', 'fontSize':'12px', 'color':'red'}} id="showError"></p>
        </div>
    )
}

export default Login
