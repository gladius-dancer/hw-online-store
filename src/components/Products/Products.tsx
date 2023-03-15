import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addProductAction, getProductsAction, updateProductsAction } from "../../store/cartReduser";


function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);
  const cart = useAppSelector(state => state.cart);

  const addToCart = (id: number)=>{
    const product = products.filter((item: any)=>item.id === id)[0];
    const founded = cart.find((item:any)=>item.id === id);
      Boolean(founded)?
      dispatch(updateProductsAction(cart.map((item: any)=>item.id === id ? {...item, count: item.count+1} : item))):
      dispatch(addProductAction({...product, count:1}))
  }

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="new_arrivals_area section_padding_100_0 clearfix">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section_heading text-center">
              <h2>New Arrivals</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="karl-projects-menu mb-100">
        <div className="text-center portfolio-menu">
          <button className="btn active" data-filter="*">ALL</button>
          <button className="btn" data-filter=".women">WOMAN</button>
          <button className="btn" data-filter=".man">MAN</button>
          <button className="btn" data-filter=".access">ACCESSORIES</button>
          <button className="btn" data-filter=".shoes">shoes</button>
          <button className="btn" data-filter=".kids">KIDS</button>
        </div>
      </div>

      <div className="container">
        <div className="row karl-new-arrivals">

          {products?.map((item: any)=>(
            <div key={item.id} className="col-12 col-sm-6 col-md-4 single_gallery_item women wow fadeInUpBig" data-wow-delay="0.2s">
              {/* Product Image */}
              <div className="product-img">
                <img src={item.image} alt=""/>
                <div className="product-quicview">
                  <a href="#" data-toggle="modal" data-target="#quickview"><i className="ti-plus"></i></a>
                </div>
              </div>
              {/* Product Description */}
              <div className="product-description">
                <h4 className="product-price">${item.price}</h4>
                <p>{item.title}</p>
                {/* Add to Cart */}
                <p onClick={()=>addToCart(item.id)} className="add-to-cart-btn">ADD TO CART</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}


export default Products;