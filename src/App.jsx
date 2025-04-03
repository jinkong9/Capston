import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'
import Login from './component/Login/login/login';
import Join from './component/Join/join';
import MyCalendar from './component/Calendar/calendar';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/join" element={<Join/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/calendar" element={<MyCalendar />}/>

   </Routes>
   </BrowserRouter>
    );
}

export default App
