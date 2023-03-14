import React from "react";
import images from "../../assets/images";
import { changeNavAction } from "../../store/changeNavReduser";

function Login() {
  return (
    <div>
      <header className="header_area">
        <div className="top_header_area">
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-end">

              <div className="col-12 col-lg-7">
                <div className="top_single_area d-flex align-items-center justify-content-between">
                  {/* Logo Area */}
                  <div className="top_logo">
                    <a href="#"><img src={images.logo} alt=""/></a>
                  </div>



                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
      <section className="login-form d-flex justify-content-center align-content-center">
          <div className="checkout_details_area mt-30 mb-50 mx-auto clearfix col-md-4">

            <div className="cart-page-heading">
              <h5>Login</h5>
            </div>
            <form action="#" method="post">
              <div className="column">
                <div className="col-md-12 mb-3">
                  <label htmlFor="first_name">Login <span>*</span></label>
                  <input type="text" className="form-control" id="first_name" required/>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="last_name">Password <span>*</span></label>
                  <input type="text" className="form-control" id="last_name" required/>
                </div>
                <button className="karl-checkout-btn">Login</button>

              </div>
            </form>
        </div>
      </section>
      <footer className="footer_area">
        <div className="container">
          <div className="footer_bottom_area">
            <div className="row">
              <div className="col-12">
                <div className="footer_social_area text-center">
                  <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default Login;