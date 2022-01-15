import React , {useState} from 'react';

import Login from './Pages/Login';

import Home from './Pages/Home';
import Signup from './Pages/Signup';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
function App() {
  // const [selectedImg, setSelectedImg] = useState(null)
  const [currUser, setCurrUser] = useState("")
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/signup" element={currUser? <Navigate replace to="/"/>:<Signup currUser={currUser} setCurrUser={setCurrUser}/>} />
      <Route exact path="/login" element={currUser? <Navigate replace to="/"/> :<Login currUser={currUser} setCurrUser={setCurrUser}/>} />
      <Route exact path="/" element={currUser? <Home currUser={currUser} setCurrUser={setCurrUser}/> : <Navigate replace to="/login"/>} />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
