import * as React from "react";
import "./assets/scss/style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Modal from "react-modal";
import { useEffect } from "react";
import { fetchUser } from "./store/actions";
import { useAppDispatch } from "./store/store";
import Shop from "./pages/Shop/Shop";

Modal.setAppElement("#root");

const App = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App;
