import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'
import UserDiaryList from './component/UserDiaryList/userdiarylist';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/user-diaries" element={<UserDiaryList/>}/>
 

   </Routes>
   </BrowserRouter>
    );
}

export default App
