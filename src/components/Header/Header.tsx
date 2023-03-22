import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { changeNavAction } from "../../store/changeNavReduser";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import "./Header.scss";
import { fetchUser } from "../../store/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/scss/main.scss";
import { setStatusAction } from "../../store/userInfoReduser";

function Header() {
  const dispatch = useAppDispatch();
  const price: any = useAppSelector(state => state.price);
  const countCartProducts: number = useAppSelector(state => state.cart).length;
  const currentUser = useAppSelector(state => state.currentUser).user;
  const isAutorized = useIsAuthorized();

  const logout = ()=>{
    localStorage.removeItem("token");
    dispatch(fetchUser())
    dispatch(setStatusAction(false));
    toast.info('User succesfully logout!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <header className="header_area">
      <ToastContainer/>
      {/* Top Header Area Start */}
      <div className="top_header_area">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-end">

            <div className="col-12 col-lg-7">
              <div className="top_single_area d-flex align-items-center justify-content-between">
                {/* Logo Area */}
                <div className="top_logo">
                  <Link to={"/"}><img src={images.logo} alt="" /></Link>
                </div>
                {/* Cart & Menu Area */}
                <div className="header-cart-menu d-flex align-items-center ml-auto">
                  {/* Cart Area */}
                  {isAutorized && <div className="cart">
                    <Link to={"/cart"} id="header-cart-btn">
                      <span className="cart_quantity">
                        {countCartProducts}
                      </span>
                      <i className="ti-bag"></i> Your Bag $ {parseFloat(price.totalPrice).toFixed(2)}
                    </Link>
                  </div>}
                  <div className="header-right-side-menu ml-15">
                    <a href="#" id="sideMenuBtn" onClick={() => dispatch(changeNavAction())}>
                      <i className="ti-menu" aria-hidden="true"></i>
                    </a>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Top Header Area End */}
      <div className="main_header_area">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 d-md-flex justify-content-between">
              {/* Header Social Area */}
              <div className="help-line">
                <a href="tel:+346573556778"><i className="ti-headphone-alt"></i> +34 657 3556 778</a>
              </div>
              {/* Menu Area */}
              <div className="main-menu-area">
                <nav className="navbar navbar-expand-lg align-items-start">

                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#karl-navbar"
                          aria-controls="karl-navbar" aria-expanded="false" aria-label="Toggle navigation"><span
                    className="navbar-toggler-icon"><i className="ti-menu"></i></span></button>

                  <div className="collapse navbar-collapse align-items-start collapse" id="karl-navbar">
                    <ul className="navbar-nav animated" id="nav">
                      <li className="nav-item active"><a className="nav-link" href="index.html">Home</a></li>
                      <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="karlDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Pages</a>
                        <div className="dropdown-menu" aria-labelledby="karlDropdown">
                          <a className="dropdown-item" href="index.html">Home</a>
                          <a className="dropdown-item" href="shop.html">Shop</a>
                          <a className="dropdown-item" href="product-details.html">Product Details</a>
                          <a className="dropdown-item" href="cart.html">Cart</a>
                          <a className="dropdown-item" href="checkout.html">Checkout</a>
                        </div>
                      </li>
                      <li className="nav-item"><a className="nav-link" href="#">Dresses</a></li>
                      <li className="nav-item"><a className="nav-link" href="#"><span
                        className="karl-level">hot</span> Shoes</a></li>
                      <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
                    </ul>
                  </div>
                </nav>
              </div>
              {/* Help Line */}
              <div className="help-line">
                {
                  isAutorized ?
                    <>
                      <Link to={"/profile"}>
                        <div className="userAvatar" style={{ backgroundImage: `url(${currentUser.avatar}` }} />
                        <p className="userName">
                          {currentUser.name}
                        </p>
                      </Link>
                      <div className="logout" onClick={()=>logout()}>
                        Logout
                      </div>
                    </> :
                    <Link to={"/login"}>
                      <i className="ti-user"></i> Login
                    </Link>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;