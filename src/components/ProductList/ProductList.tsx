import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

type ListProduct = {
  products:[
    id: number,
    image: string,
    price: number,
    title: string
  ]
  showDetails: any,
  addToCart: any,
  currentPage: any,
  handleChange: any
}

function ProductList(props: ListProduct) {
  return (
    <div className="container">
      <div className="row karl-new-arrivals">
        {props.products?.map((item: any) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 single_gallery_item women wow fadeInUpBig"
               data-wow-delay="0.2s">
            {/* ProductType Image */}
            <div className="product-img">
              <img src={item.images[0]} alt="" />
              <div className="product-quicview">
                <p onClick={() => props.showDetails(item.id)} data-target="#quickview"><i
                  className="ti-plus"></i></p>
              </div>
            </div>
            {/* ProductType Description */}
            <div className="product-description">
              <h4 className="product-price">${item.price}</h4>
              <p>{item.title}</p>
              {/* Add to Cart */}
              <p onClick={() => props.addToCart(item.id)} className="add-to-cart-btn">ADD TO CART</p>
            </div>
          </div>
        ))}

        <div className="col-12 mt-30 mb-30 d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination count={10} page={props.currentPage} onChange={props.handleChange} />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default ProductList;