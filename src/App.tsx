import * as React from "react";
import "./assets/scss/style.scss";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";

const App = () => (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
    </BrowserRouter>
);

export default App;
