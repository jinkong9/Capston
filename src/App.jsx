import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'
import Login from './component/Login/login/login';
import Join from './component/Join/join';
import MyCalendar from './component/Calendar/calendar';
import Changepw from './component/Changepw/changepw';
import UserDiaryList from './component/UserDiaryList/userdiarylist';
import Writediary from './component/WriteDiary/writediary';
import UserInfo from './component/Userinfo/userinfo';

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>

    <Route path="/join" element={<Join/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/calendar" element={<MyCalendar />}/>
    <Route path="/changepw" element={<Changepw />}/>
    <Route path="/user-diaries" element={<UserDiaryList/>}/>
    <Route path="/write-diary" element={<Writediary />}/>
    <Route path="/userinfo" element={<UserInfo />}/>
    <Route path="/changepw" element={<Changepw />}/>


   </Routes>
   </BrowserRouter>
    );
}

export default App
