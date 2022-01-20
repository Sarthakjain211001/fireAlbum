import React,{useEffect} from 'react'
import {getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
signInWithEmailAndPassword
} from 'firebase/auth'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import loader from '../images/loaderImg.gif'
import { SignInWithGoogle } from '../firebase/SignInWithGoogle';

const Login = ({currUser, setCurrUser, L, setL}) => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [resetMail, setResetMail] = useState("");
    const auth = getAuth();

 
    useEffect(() => {        
        if(L){
        document.getElementById("Loader").style.display="block";  //When the page loads we will show the loader. If auth state changes then if currentuser is not present then disappear the loader( code written in onAuthStateChanged).
        document.getElementById("loginBtn").disabled= true  ;
        document.getElementById("loginBtn").style.cursor= "not-allowed" ;
        }        
    },[])

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

    const resetPassword = ()=>{
        document.getElementById('reset').style.display="block"
     
    }
    const sendLink = ()=>{
        sendPasswordResetEmail(auth, resetMail)
        .then(()=>{document.getElementById('sendSuccess').style.display='block'; document.getElementById('showError').innerHTML=""})
        .catch((err)=>{document.getElementById('showError').innerHTML=err.message})
    }

    const setLoadOff=()=>{
        setL(0);
    }
    
    return (
        <div className='login'>
            <div className='title'>
                <h1>FireAlbum</h1>
                <button onClick={SignInWithGoogle}>  {/*When this fun (SignInWithGoogle) will run the user will get logged in and his details will get saved in auth.
                                                      And as the auth will change onAuthStateChanged will run and it will set the currUser and we will get redirected to  "/"  */}
                <img className='googleImg' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'/>    
                    <span>Continue with Google</span>
                </button>
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
            
            
            <p style={{'textAlign':'center', 'fontSize':'15px'}}>Don't have an account? <Link to="/signup" onClick={setLoadOff}>Register</Link></p>            
            <span onClick={resetPassword} style={{"margin":"auto", "display":"table" ,"textAlign":"center" ,'fontSize':'14px', 'textDecoration':'underline', 'color':'#249e43', 'cursor':'pointer'}}>Forgot Password?</span>    
            <p style={{'textAlign':'center', 'fontSize':'12px', 'color':'red'}} id="showError"></p>
            <div id="reset" style={{"textAlign":'center', 'display':'none'}}>
            <input  id="resetPassInput" onChange={e=>setResetMail(e.target.value)} placeholder='Enter email Id to send password reset Link'></input>
            <button onClick={sendLink}>Send</button>
            </div>
            <p id="sendSuccess" style={{'textAlign':'center', 'color':'green', 'display':'none'}}>Email Sent</p>
            <div className='loader' id="Loader">
            <img className='loaderImg' src={loader} alt="loader"/>
            
            </div>
        </div>
    )
}

export default Login
