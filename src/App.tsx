import * as React from "react";
import "./assets/scss/style.scss";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
);

export default App;
