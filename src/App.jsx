import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, } from "react-router-dom";

import Main from "./component/Main/main/main";
import Login from "./component/Login/login/login";
import Join from "./component/Join/join";
import MyCalendar from "./component/Calendar/calendar";
import Changepw from "./component/Changepw/changepw";
import UserDiaryList from "./component/UserDiaryList/userdiarylist";
import UserInfo from "./component/Userrinfo/userinfo";
import Profilepage from "./component/Profile/profile";
import Writediary from "./component/WriteDiary/writediary";
import MyDiaryList from "./component/Mydiary/mydiary";
import MyEditDiary from "./component/Mydiary/editDiary";
import ModalPage from "./component/Modal/modal";
import { ModalProvider } from "./component/CreatContextAPI/modalContext";
import UsersInfo from "./component/Userrinfo/useresinfo";
import UsersDiaryList from "./component/UserDiaryList/usersdiarylist";

function App() {
  return (
    <BrowserRouter>
     <ModalProvider>
      <Routes>
     
        <Route path="/" element={<Main />} />

        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<MyCalendar />} />
        <Route path="/changepw" element={<Changepw />} />
        <Route path="/user-diaries" element={<UserDiaryList />} />
        <Route path="/write-diary" element={<Writediary />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/profile" element={<Profilepage />} />
        <Route path="/my-diary" element={<MyDiaryList />} />
        <Route path="/edit-diary" element={<MyEditDiary />} />
        <Route path="/modal" element={<ModalPage />} />
        <Route path="/users-info" element={<UsersInfo />} />
        <Route path="/users-diaries" element={<UsersDiaryList />} />
     
      </Routes>
         </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
