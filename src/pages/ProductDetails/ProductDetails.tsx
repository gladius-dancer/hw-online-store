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
import { Link, useLocation } from "react-router-dom";
import {fetchSingleProduct} from "../../store/actions";


const ProductDetails = () => {

  const nav = useAppSelector(state => state.changeNAv);
  const dispatch = useAppDispatch();
  const product = useAppSelector(state => state.products.products);
  const cart = useAppSelector(state => state.cart);
  const isAuth = useIsAuthorized();
  const navigate = useNavigate();
  const match = useMatch("/details/:id");

  
  // const product = products.find((item: any) => item.id == match.params.id);

  const notifyAddProduct = () => toast.success("Product added to cart!", {
    position: "top-left",
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
      // const product = products.filter((item: any) => item.id === id)[0];
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

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(()=>{
    dispatch(fetchSingleProduct(match?.params.id!))
    console.log(product);
  },[])

  const location = useLocation();
  const paths = location.pathname.split("/").filter(path => path !== "");
  let breadcrumb = "";


  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header />
        <Discount />
        <div className="breadcumb_area">
          <div className="container">
            <div className="row">
              <div className="text-capitalize">
                <Link to="/">home /</Link>
                {paths.map((path, index) => {
                  breadcrumb += "/" + path;
                  if (index === paths.length - 1) {
                    return <span key={index}>{path}</span>;
                  }
                  return (
                    <span key={index}>{path} /&nbsp; </span>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
        <ToastContainer />

        <section className="single_product_details_area section_padding_0_100">
          <div className="container">
            <div className="row">

              <div className="col-12 col-md-6">
                <div className="single_product_thumb">
                  <div id="product_details_slider" className="carousel slide" data-ride="carousel">

                    <ol className="carousel-indicators">
                      <li className="active" data-target="#product_details_slider" data-slide-to="0"
                          style={{ backgroundImage: `url(${product.images})` }}>
                      </li>
                      <li data-target="#product_details_slider" data-slide-to="1"
                          style={{ backgroundImage: `url(${product.images})` }}>
                      </li>
                      <li data-target="#product_details_slider" data-slide-to="2"
                          style={{ backgroundImage: `url(${product.images})` }}>
                      </li>

                    </ol>

                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <a className="gallery_img">
                          <img className="d-block w-100" src={product.images} alt="First slide" />
                        </a>
                      </div>
                      <div className="carousel-item">
                        <a className="gallery_img">
                          <img className="d-block w-100" src={product.images} alt="First slide" />
                        </a>
                      </div>
                      <div className="carousel-item">
                        <a className="gallery_img">
                          <img className="d-block w-100" src={product.images} alt="First slide" />
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="single_product_desc">

                  <h4 className="title"><a href="#">{product.title}</a></h4>

                  <h4 className="price">$ {product.price}</h4>

                  <p className="available">Available: <span className="text-muted">In Stock</span></p>

                  <div className="single_product_ratings mb-15">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                  </div>

                  {/*Add to Cart Form */}
                  <form className="cart clearfix mb-50 d-flex" method="post">
                    <button onClick={() => addToCart(product.id)} name="addtocart" value="5"
                            className="btn cart-submit d-block">Add to cart
                    </button>
                  </form>

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
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;