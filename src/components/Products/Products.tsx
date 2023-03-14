import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useEffect } from "react";
import { fetchProducts } from "../../store/actions";
import { useAppDispatch, useAppSelector } from "../../store/store";


function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.products);

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
                <a href="#" className="add-to-cart-btn">ADD TO CART</a>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}


export default Products;