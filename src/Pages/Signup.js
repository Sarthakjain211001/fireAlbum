import React, {useState} from 'react'
import {getAuth, 
createUserWithEmailAndPassword,
onAuthStateChanged
} from 'firebase/auth'
import { Link} from 'react-router-dom'
import loader from '../images/loaderImg.gif'

const Signup = ({currUser, setCurrUser}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const auth = getAuth();
    
    onAuthStateChanged(auth, (currentUser)=>{  //whenver the state of auth will change this will run. i.e if a user logs in or logs out or a persisted state is present . It's like useEffect().
        setCurrUser(currentUser);
    })
  
  
    const handleSignup = (e)=>{
        e.preventDefault();
        document.getElementById("signupBtn").disabled= true
        document.getElementById("signupBtn").style.cursor= "not-allowed"
        document.getElementById("Loader").style.display="block";
        createUserWithEmailAndPassword(auth, email, password)
        .then((credential)=>{
            
             //After succresssful signup ; firebase will login the user. His details will get saved in auth.currentUser. onAuthStateChanged will run and it will setCurrUser
                                          //It is persistant i.e it will remain saved even after the user refreshes the page.
        }).catch((err)=>{
            document.getElementById("Loader").style.display="none";
            document.getElementById("signupBtn").disabled= false;
            document.getElementById("signupBtn").style.cursor= "pointer"
            document.getElementById('showError').innerHTML=err.message;
        });    
        
    }

    return (
        <div className='signup'>
            <div className='title'><h1>FireAlbum</h1></div>
            <h3 style={{'textAlign':'center', 'marginBottom':'50px', "marginTop":"100px"}}>Create a new account</h3>
            <form>
                Email<br/>
                <input placeholder='email' type='email' onChange={(e)=> setEmail(e.target.value)}/><br/><br/>
                Password<br/>
                <input placeholder='password' type='password' onChange={(e)=> setPassword(e.target.value)}/><br/><br/>
                <button id="signupBtn"type='submit' onClick={handleSignup}>Signup</button>
            </form>
            <br/>
            <p style={{'textAlign':'center', 'fontSize':'15px'}}>Already have an account? <Link to="/login">Login</Link></p>
            <p style={{'textAlign':'center', 'fontSize':'12px', 'color':'red'}} id="showError"></p>
            <div className='loader' id="Loader">
            <img className='loaderImg' src={loader} />
            </div>
        </div>
    )
}

export default Signup
