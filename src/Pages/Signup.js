import React, {useState} from 'react'
import {getAuth, 
createUserWithEmailAndPassword,
onAuthStateChanged
} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

const Signup = ({currUser, setCurrUser}) => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [currUser, setCurrUser] = useState("")    
    
    const auth = getAuth();
    
    onAuthStateChanged(auth, (currentUser)=>{  //whenver the state of auth will change this will run. i.e if a user logs in or logs out or a persisted state is present . It's like useEffect().
        setCurrUser(currentUser);
        // currUser && navigate("/");
        // currentUser && localStorage.setItem('user', currentUser.uid)
    })
  
  
    const handleSignup =(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((credential)=>{
            console.log("signup success", credential.user.accessToken,credential.user.email );
            console.log(auth.currentUser) //After succresssful signup ; firebase will login the user. His details will get saved in auth.currentUser
                                          //It is persistant i.e it will remain saved even after the user refreshes the page.
        }).catch((err)=>{document.getElementById('showError').innerHTML=err.message});    
        
    }

 console.log(email, password)
    return (
        <div className='signup'>
            <div className='title'><h1>FireAlbum</h1></div>
            <h3 style={{'textAlign':'center', 'marginBottom':'50px', "marginTop":"100px"}}>Create a new account</h3>
            <form>
                Email<br/>
                <input placeholder='email' type='email' onChange={(e)=> setEmail(e.target.value)}/><br/><br/>
                Password<br/>
                <input placeholder='password' type='password' onChange={(e)=> setPassword(e.target.value)}/><br/><br/>
                <button type='submit' onClick={handleSignup}>Signup</button>
            </form>
            <br/>
            <p style={{'textAlign':'center', 'fontSize':'15px'}}>Already have an account? <Link to="/login">Login</Link></p>
            <p style={{'textAlign':'center', 'fontSize':'12px', 'color':'red'}} id="showError"></p>
        </div>
    )
}

export default Signup
