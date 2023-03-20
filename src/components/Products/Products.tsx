import * as React from "react";
import { useEffect, useState } from "react";
import { fetchProducts, fetchUser } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addProductAction, getProductsAction, updateProductsAction } from "../../store/cartReduser";
import { setPriceAction } from "../../store/priceReduser";
import { ProductType } from "../../types/ProductType";
import ModalComponent from "../Modal/ModalComponent";
import Pagination from "@mui/material/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/scss/main.scss";
import Stack from "@mui/material/Stack";
import "./Products.scss";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { useNavigate } from 'react-router-dom';


function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const cart = useAppSelector(state => state.cart);
  const [modal, setModal] = useState(false);
  const [currentProduct, setSetCurrentProduct] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const isAuth = useIsAuthorized();
  const navigate = useNavigate();

  const handleChange = (event: any, value: number) => {
    setCurrentPage(value);
  };
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
    if(isAuth){
      notifyAddProduct();
      const product = products.filter((item: any) => item.id === id)[0];
      const founded = cart.find((item: any) => item.id === id);
      Boolean(founded) ?
        dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? {
          ...item,
          count: item.count + 1
        } : item))) :
        dispatch(addProductAction({ ...product, count: 1, totalPrice: product.price }));
      setModal(false);
    }
    else{
      return navigate('/login');
    }

  };

  const priceCalc = () => {
    const totalPrice = cart.reduce((summ: number, current: any) => {
      return summ + (current.price * current.count);
    }, 0);

    dispatch(setPriceAction({ totalPrice: totalPrice, shipping: 0 }));
  };

  const showDetails = (id: number) => {
    setModal(true);
    const current: ProductType = products.filter((product: any) => product.id === id)[0];
    setSetCurrentProduct(current);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    priceCalc();
  }, [cart]);

  useEffect(() => {
    dispatch(fetchProducts(currentPage * 10 - 10));
  }, [currentPage]);


  return (
    <>
      <ToastContainer />
      <section className="new_arrivals_area section_padding_100_0 clearfix">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section_heading text-center">
                <h2>Our products</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row karl-new-arrivals">
            {products?.map((item: any) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 single_gallery_item women wow fadeInUpBig"
                   data-wow-delay="0.2s">
                {/* ProductType Image */}
                <div className="product-img">
                  <img src={item.images[2]} alt="" />
                  <div className="product-quicview">
                    <a href="#" onClick={() => showDetails(item.id)} data-target="#quickview"><i
                      className="ti-plus"></i></a>
                  </div>
                </div>
                {/* ProductType Description */}
                <div className="product-description">
                  <h4 className="product-price">${item.price}</h4>
                  <p>{item.title}</p>
                  {/* Add to Cart */}
                  <p onClick={() => addToCart(item.id)} className="add-to-cart-btn">ADD TO CART</p>
                </div>
              </div>
            ))}

            <div className="col-12 mt-30 mb-30 d-flex justify-content-center">
              <Stack spacing={2}>
                <Pagination count={10} page={currentPage} onChange={handleChange} />
              </Stack>
            </div>
          </div>
        </div>

        <ModalComponent
          isOpen={modal}
          className="modal"
          overlayClassName="modal-overlay"
        >
          <div className="" id="quickview" role="dialog" aria-labelledby="quickview"
               aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <button onClick={() => setModal(false)} type="button" className="close btn" data-dismiss="modal"
                        aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>

                <div className="modal-body">
                  <div className="quickview_body">
                    <div className="container">
                      <div className="row">
                        <div className="col-12 col-lg-5 d-flex align-items-center">
                          <div className="quickview_pro_img">
                            <img src={currentProduct.images} alt="" />
                          </div>
                        </div>
                        <div className="col-12 col-lg-7">
                          <div className="quickview_pro_des">
                            <h5 className="title">{currentProduct.title}</h5>
                            <div className="top_seller_product_rating mb-15">
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </div>
                            <h5 className="price">$ {currentProduct.price}
                              <span>$ {parseFloat(String(currentProduct.price * 130 / 100)).toFixed(2)}</span></h5>
                            <p>{(currentProduct.description) ? (currentProduct.description).split("").splice(0, 150).join("") + "..." : ""}</p>
                            <a href="#">View Full Product Details</a>
                          </div>
                          <div className="cart">
                            <button onClick={() => addToCart(currentProduct.id)} name="addtocart"
                                    className="cart-submit">Add to cart
                            </button>
                            <div className="modal_pro_wishlist">
                              <a href="wishlist.html" target="_blank"><i className="ti-heart"></i></a>
                            </div>
                            <div className="modal_pro_compare">
                              <a href="compare.html" target="_blank"><i className="ti-stats-up"></i></a>
                            </div>
                          </div>

                          <div className="share_wf mt-30">
                            <p>Share With Friend</p>
                            <div className="_icon">
                              <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                              <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                              <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                              <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </ModalComponent>


      </section>
    </>

  );
}


export default Products;