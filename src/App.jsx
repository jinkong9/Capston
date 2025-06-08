import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'
import Login from './component/Login/login/login';
import Join from './component/Join/join';
import Changepw from './component/Changepw/changepw';
import UserDiaryList from './component/UserDiaryList/userdiarylist';
import WriteDiary from './component/Writediary/writediary';
import UserInfo from './component/Userinfo/userinfo';
import Mycalendar from './component/Calendar/calendar';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>

    <Route path="/join" element={<Join/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/calendar" element={<Mycalendar />}/>
    <Route path="/changepw" element={<Changepw />}/>
    <Route path="/user-diaries" element={<UserDiaryList/>}/>
    <Route path="/write-diary" element={<WriteDiary />}/>
    <Route path="/user-info" element={<UserInfo />}/>
    <Route path="/changepw" element={<Changepw />}/>


   </Routes>
   </BrowserRouter>
    );
}

export default App
