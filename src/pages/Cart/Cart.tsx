import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addProductAction, updateProductsAction } from "../../store/cartReduser";
import { Link } from "react-router-dom";

function Cart() {

  const dispatch = useAppDispatch();
  const nav = useAppSelector(state => state.changeNAv);
  const cart = useAppSelector(state => state.cart);
  const incCount = (id: number) => {
    dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? { ...item, count: item.count + 1 } : item)));
  };
  const decCount = (id: number) => {
    if(cart.find((item:any)=>item.id === id).count > 1){
      dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? { ...item, count: item.count - 1 } : item)));
    }
    else{
      dispatch(updateProductsAction(cart.filter((item: any) => item.id !== id)));
    }
  };
  const clear = ()=>{
    dispatch(updateProductsAction([]));
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header />
        <div className="cart_area pt-50 pb-50 clearfix">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="cart-table clearfix">
                  <table className="table table-responsive">
                    <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item: any) => (
                      <tr key={item.id}>
                        <td className="cart_product_img d-flex align-items-center">
                          <a href="#"><img src={item.image} alt="Product" /></a>
                          <h6>{item.title}</h6>
                        </td>
                        <td className="price"><span>${item.price}</span></td>
                        <td className="qty">
                          <div className="quantity">
                      <span className="qty-minus" onClick={() => decCount(item.id)}>
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </span>
                            <input type="number" className="qty-text" id="qty" step="1" min="1" max="99" name="quantity"
                                   value={item.count} />
                            <span className="qty-plus" onClick={() => incCount(item.id)}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </span>
                          </div>
                        </td>
                        <td className="total_price"><span>${item.price}</span></td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <div className="cart-footer d-flex mt-30">
                  <div className="back-to-shop w-50">
                    <Link to="/">Continue shooping</Link>
                  </div>
                  <div className="update-checkout w-50 text-right">
                    <p onClick={()=>clear()}>clear cart</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="coupon-code-area mt-70">
                  <div className="cart-page-heading">
                    <h5>Cupon code</h5>
                    <p>Enter your cupone code</p>
                  </div>
                  <form action="#">
                    <input type="search" name="search" placeholder="" />
                    <button type="submit">Apply</button>
                  </form>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="shipping-method-area mt-70">
                  <div className="cart-page-heading">
                    <h5>Shipping method</h5>
                    <p>Select the one you want</p>
                  </div>

                  <div className="custom-control custom-radio mb-30">
                    <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label d-flex align-items-center justify-content-between"
                           htmlFor="customRadio1"><span>Next day delivery</span><span>$4.99</span></label>
                  </div>

                  <div className="custom-control custom-radio mb-30">
                    <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label d-flex align-items-center justify-content-between"
                           htmlFor="customRadio2"><span>Standard delivery</span><span>$1.99</span></label>
                  </div>

                  <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label d-flex align-items-center justify-content-between"
                           htmlFor="customRadio3"><span>Personal Pickup</span><span>Free</span></label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="cart-total-area mt-70">
                  <div className="cart-page-heading">
                    <h5>Cart total</h5>
                    <p>Final info</p>
                  </div>

                  <ul className="cart-total-chart">
                    <li><span>Subtotal</span> <span>$59.90</span></li>
                    <li><span>Shipping</span> <span>Free</span></li>
                    <li><span><strong>Total</strong></span> <span><strong>$59.90</strong></span></li>
                  </ul>
                  <a href="checkout.html" className="btn karl-checkout-btn">Proceed to checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>

  );
}

export default Cart;