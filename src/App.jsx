import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './component/Main/main/main'

function App() {
 

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Main/>}/>

 

   </Routes>
   </BrowserRouter>
    );
}

export default App
