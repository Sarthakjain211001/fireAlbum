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

  const [currUser, setCurrUser] = useState("")
  const [L, setL] = useState(1);

  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path="/signup" element={currUser? <Navigate replace to="/"/>:<Signup currUser={currUser} setCurrUser={setCurrUser} L={L} setL={setL}/>} />
      <Route exact path="/login" element={currUser? <Navigate replace to="/"/> :<Login currUser={currUser} setCurrUser={setCurrUser} L={L} setL={setL}/>} />
      <Route exact path="/" element={currUser? <Home currUser={currUser} setCurrUser={setCurrUser}/> : <Navigate replace to="/login"/>} />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
