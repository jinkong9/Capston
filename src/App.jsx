import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'
import UserDiaryList from './component/UserDiaryList/userdiarylist';
import Writediary from './component/Writediary/writediary';
function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/user-diaries" element={<UserDiaryList/>}/>
    <Route path="/write-diary" element={<Writediary/>}/>
 

   </Routes>
   </BrowserRouter>
    );
}

export default App
