import React, { useEffect, useState } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Discount from "../../components/Discount/Discount";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import SideBar from "../../components/SideBar/SideBar";
import ProductList from "../../components/ProductList/ProductList";
import { useIsAuthorized } from "../../hooks/useIsAuthorized";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addProductAction, updateProductsAction } from "../../store/cartReduser";
import { setPriceAction } from "../../store/priceReduser";
import { ProductType } from "../../types/ProductType";
import { fetchProducts } from "../../store/actions";
import QuickView from "../../components/QuickView/QuickView";
import ModalComponent from "../../components/Modal/ModalComponent";

function Shop() {

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
    console.log(id);
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
        <Header />
        <Discount />
        <section className="shop_grid_area section_padding_100">
          <div className="container">
            <div className="row">
              <SideBar />
              <div className="col-12 col-md-8 col-lg-9">
                <div className="shop_grid_product_area">
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
                    />
                  </ModalComponent>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>

    </>
  );
}

export default Shop;