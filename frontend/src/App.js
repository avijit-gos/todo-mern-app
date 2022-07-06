/** @format */
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Signin from "./Pages//Signin/Signin";
import Home from "./Pages/Home/Home";
import CompleteTask from "./Pages/CompleteTask/CompleteTask";
import PendingTask from "./Pages/PendingTask/PendingTask";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";

import { MyState } from "./Context/Context";
import "./App.css";

function App() {
  const { user, setUser, call } = MyState();

  useEffect(() => {
    var userData = JSON.parse(localStorage.getItem("User"));
    setUser(userData);
  }, [call]);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/complete' element={<CompleteTask />} />
        <Route path='/pending' element={<PendingTask />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
