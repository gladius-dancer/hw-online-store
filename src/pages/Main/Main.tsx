import * as React from "react";
import Products from "../../components/Products/Products";
import Footer from "../../components/Footer/Footer";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import  Discount from "../../components/Discount/Discount";
import { useAppSelector } from "../../store/store";
import MainSlider from "../../components/MainSlider/MainSlider";

const Main = () => {

  const nav = useAppSelector(state => state.changeNAv);

  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header/>
        <Discount/>
        {/*<MainSlider/>*/}
        <Products />
        <Footer/>
      </div>

    </>
  );
};

export default Main;