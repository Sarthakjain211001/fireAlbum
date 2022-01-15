import { getAuth, signOut } from 'firebase/auth';
import React from 'react';


const Title = ({setCurrUser}) => {

  const auth = getAuth();
  const handleLogout=()=>{
    signOut(auth).then(()=>{
        setCurrUser("");
        localStorage.clear();
    });
}

  return (
    <div className="title">
      <div className='top'>
      <h1>FireAlbum</h1>
      <div className='topRight'>
      <div className='username' id="u1">{auth.currentUser.email} </div>
      <span className="logoutButton" style={{"marginLeft":"20px"}} onClick={handleLogout}>Logout</span>       
      </div>
      </div>
      <span className='username' id="u2">{auth.currentUser.email} </span>
      <h2>Your Pictures</h2>
      <p>An online Album to keep your pictures safe</p>
    </div>
  )
}

export default Title;