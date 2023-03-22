import * as React from "react";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Discount from "../../components/Discount/Discount";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { useMatch, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProductAction, updateProductsAction } from "../../store/cartReduser";
import { setPriceAction } from "../../store/priceReduser";
import images from "../../assets/images";

const ProductDetails = () => {

  const nav = useAppSelector(state => state.changeNAv);
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const cart = useAppSelector(state => state.cart);
  const isAuth = useIsAuthorized();
  const navigate = useNavigate();
  const match = useMatch("/character/:id");
  // const product = products.find((item: any)=>item.id===match.params.id);

  console.log(match);


  const notifyAddProduct = () => toast.success("Product added to cart!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  });

  const addToCart = (id: number) => {
    if (isAuth) {
      notifyAddProduct();
      const product = products.filter((item: any) => item.id === id)[0];
      const founded = cart.find((item: any) => item.id === id);
      Boolean(founded) ?
        dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? {
          ...item,
          count: item.count + 1
        } : item))) :
        dispatch(addProductAction({ ...product, count: 1, totalPrice: product.price }));
    } else {
      return navigate("/login");
    }
  };

  const priceCalc = () => {
    const totalPrice = cart.reduce((summ: number, current: any) => {
      return summ + (current.price * current.count);
    }, 0);

    dispatch(setPriceAction({ totalPrice: totalPrice, shipping: 0 }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    priceCalc();
  }, [cart]);

  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header/>
        <Discount/>
        <ToastContainer />

        <section className="single_product_details_area section_padding_0_100">
          <div className="container">
            <div className="row">

              <div className="col-12 col-md-6">
                <div className="single_product_thumb">
                  <div id="product_details_slider" className="carousel slide" data-ride="carousel">

                    <ol className="carousel-indicators">
                      <li className="active" data-target="#product_details_slider" data-slide-to="0"
                          style={{backgroundImage: `url(${images.product1})`}}>
                      </li>
                      <li className="active" data-target="#product_details_slider" data-slide-to="0"
                          style={{backgroundImage: `url(${images.product2})`}}>
                      </li>
                      <li className="active" data-target="#product_details_slider" data-slide-to="0"
                          style={{backgroundImage: `url(${images.product3})`}}>
                      </li>

                    </ol>

                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <a className="gallery_img" href={images.product9}>
                          <img className="d-block w-100" src={images.product9} alt="First slide"/>
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="single_product_desc">

                  <h4 className="title"><a href="#">Long Yellow Dress</a></h4>

                  <h4 className="price">$ 39.99</h4>

                  <p className="available">Available: <span className="text-muted">In Stock</span></p>

                  <div className="single_product_ratings mb-15">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                  </div>

                  {/* Add to Cart Form */}
                  {/*<form className="cart clearfix mb-50 d-flex" method="post">*/}
                  {/*  <div className="quantity">*/}
                  {/*    <span className="qty-minus"*/}
                  {/*          onClick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;"><i*/}
                  {/*      className="fa fa-minus" aria-hidden="true"></i></span>*/}
                  {/*    <input type="number" className="qty-text" id="qty" step="1" min="1" max="12" name="quantity"*/}
                  {/*           value="1">*/}
                  {/*      <span className="qty-plus"*/}
                  {/*            onClick="var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;"><i*/}
                  {/*        className="fa fa-plus" aria-hidden="true"></i></span>*/}
                  {/*  </div>*/}
                  {/*  <button type="submit" name="addtocart" value="5" className="btn cart-submit d-block">Add to cart*/}
                  {/*  </button>*/}
                  {/*</form>*/}

                  <div id="accordion" role="tablist">
                    <div className="card">
                      <div className="card-header" role="tab" id="headingOne">
                        <h6 className="mb-0">
                          <a data-toggle="collapse" href="#collapseOne" aria-expanded="true"
                             aria-controls="collapseOne">Information</a>
                        </h6>
                      </div>

                      <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne"
                           data-parent="#accordion">
                        <div className="card-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales.
                            Phasellus sagittis auctor gravida. Integ er bibendum sodales arcu id te mpus. Ut consectetur
                            lacus.</p>
                          <p>Approx length 66cm/26" (Based on a UK size 8 sample) Mixed fibres</p>
                          <p>The Model wears a UK size 8/ EU size 36/ US size 4 and her height is 5'8"</p>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" role="tab" id="headingTwo">
                        <h6 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false"
                             aria-controls="collapseTwo">Cart Details</a>
                        </h6>
                      </div>
                      <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo"
                           data-parent="#accordion">
                        <div className="card-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quis in veritatis
                            officia inventore, tempore provident dignissimos nemo, nulla quaerat. Quibusdam non, eos,
                            voluptatem reprehenderit hic nam! Laboriosam, sapiente! Praesentium.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia magnam laborum eaque.</p>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" role="tab" id="headingThree">
                        <h6 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false"
                             aria-controls="collapseThree">shipping &amp; Returns</a>
                        </h6>
                      </div>
                      <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree"
                           data-parent="#accordion">
                        <div className="card-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quo sint repudiandae
                            suscipit ab soluta delectus voluptate, vero vitae, tempore maxime rerum iste dolorem
                            mollitia perferendis distinctio. Quibusdam laboriosam rerum distinctio. Repudiandae fugit
                            odit, sequi id!</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae qui maxime consequatur
                            laudantium temporibus ad et. A optio inventore deleniti ipsa.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
    </>
  );
};

export default ProductDetails;