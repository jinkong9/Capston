import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'
import Login from './component/Login/login/login';
import Join from './component/Join/join';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/join" element={<Join/>}/>
    <Route path="/login" element={<Login/>}/>

   </Routes>
   </BrowserRouter>
    );
}

export default App
