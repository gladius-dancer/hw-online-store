import * as React from "react";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Discount from "../../components/Discount/Discount";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addProductAction, updateProductsAction } from "../../store/cartReduser";
import { setPriceAction } from "../../store/priceReduser";
import { ProductType } from "../../types/ProductType";
import { fetchProducts } from "../../store/actions";
import ProductList from "../../components/ProductList/ProductList";
import ModalComponent from "../../components/Modal/ModalComponent";
import QuickView from "../../components/QuickView/QuickView";

const Main = () => {
  const nav = useAppSelector(state => state.changeNAv);
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const cart = useAppSelector(state => state.cart);
  const [modal, setModal] = useState(false);
  const [currentProduct, setSetCurrentProduct] = useState <any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const isAuth = useIsAuthorized();
  const navigate = useNavigate();

  const handleChange = (event: any, value: number) => {
    setCurrentPage(value);
  };

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
      const product = products.filter((item: any) => item.id === id)[0];
      const founded = cart.find((item: any) => item.id === id);
      Boolean(founded) ?
        dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? {
          ...item,
          count: item.count + 1
        } : item))) :
        dispatch(addProductAction({ ...product, count: 1, totalPrice: product.price }));
      setModal(false);
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
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header/>
        <Discount/>
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
            <ProductList
              products={products}
              showDetails={showDetails}
              addToCart={addToCart}
              currentPage={currentPage}
              handleChange={handleChange}
            />
            <ModalComponent
              isOpen={modal}
              className="modal"
              overlayClassName="modal-overlay"
            >
              <QuickView
                id={currentProduct.id}
                image={currentProduct.images}
                title={currentProduct.title}
                price={currentProduct.price}
                description={currentProduct.description}
                setModal={setModal}
                addToCart={addToCart}
                link="/details"
              />
            </ModalComponent>
          </section>
        <Footer/>
      </div>
    </>
  );
};

export default Main;