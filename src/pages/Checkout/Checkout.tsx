import React, { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { updateProductsAction } from "../../store/cartReduser";
import { Link } from "react-router-dom";
import { setPriceAction } from "../../store/priceReduser";
import { setShippingAction } from "../../store/shippingReduser";
import { InputText } from "../../components/FormComponents/InputText";
import { Dropdown } from "../../components/FormComponents/Dropdown";
import { InputCheckbox } from "../../components/FormComponents/Checkbox";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../store/actions";

const options = [
  {
    label: "Karakalpakstan",
    value: "1",
  },
  {
    label: "United Kingdom",
    value: "2",
  },
  {
    label: "Germany",
    value: "3",
  },
  {
    label: "United States",
    value: "4",
  },
];

function Checkout() {

  const dispatch = useAppDispatch();
  const nav = useAppSelector(state => state.changeNAv);
  const cart = useAppSelector(state => state.cart);
  const price: any = useAppSelector(state => state.price);
  const shipping: any = useAppSelector(state => state.shipping);

  const incCount = (id: number) => {
    dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? { ...item, count: item.count + 1 } : item)));
    priceCalc();
  };

  const decCount = (id: number) => {
    if (cart.find((item: any) => item.id === id).count > 1) {
      dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? {
        ...item,
        count: item.count - 1
      } : item)));
    } else {
      dispatch(updateProductsAction(cart.map((item: any) => item.id === id ? { ...item, count: item.count } : item)));
    }
    priceCalc();
  };

  const deleteProduct = (id: number) => {
    dispatch(updateProductsAction(cart.filter((item: any) => item.id !== id)));
  };

  const priceCalc = () => {
    const totalPrice = cart.reduce((summ: number, current: any) => {
      return summ + (current.price * current.count);
    }, 0);

    dispatch(setPriceAction({ totalPrice: totalPrice, shipping: 0 }));
    return totalPrice;
  };

  const changeShipping = (value: string) => {
    dispatch(setShippingAction(value));
    return value;
  };

  const clear = () => {
    dispatch(updateProductsAction([]));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(priceCalc()));
    localStorage.setItem("shipping", JSON.stringify(shipping));

  }, [cart, shipping]);

  const schema = yup.object().shape({
    name: yup.string().required(),
    last: yup.string().required(),
    email: yup.string().required().email(),
    country: yup.string().required(),
    address: yup.string().required(),
    number: yup.string().required(),
    postalCode: yup.string().required()
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit, control, setValue, formState: { errors } } = methods;
  const onSubmit = async (data: any) => {
    dispatch(loginUser(data));
  };

  // @ts-ignore
  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header />
        <div className="checkout_area pt-30 mb-50">
          <div className="container">
            <form className="row" action="#" method="post">

              <div className="col-12 col-md-6">
                <div className="checkout_details_area clearfix">
                  <div className="cart-page-heading">
                    <h5>Billing Address</h5>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="first_name">First Name <span>*</span></label>
                        <InputText
                          key="name"
                          status={true}
                          name="firstName"
                          control={control}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="last_name">Last Name <span>*</span></label>
                        <InputText
                          key="last"
                          status={true}
                          name="lastName"
                          control={control}
                        />
                      </div>
                      <div className="col-12 mb-3 d-flex flex-column">
                        <label htmlFor="country">Country <span>*</span></label>
                        <Dropdown
                          key="country"
                          name="country"
                          control={control}
                          options={options}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="street_address">Address <span>*</span></label>
                        <InputText
                          key="adress"
                          status={true}
                          name="adress"
                          control={control}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="postcode">Postcode <span>*</span></label>
                        <InputText
                          key="postalCode"
                          status={true}
                          name="postalCode"
                          control={control}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="phone_number">Phone No <span>*</span></label>
                        <InputText
                          key="number"
                          status={true}
                          name="number"
                          control={control}
                        />
                      </div>
                      <div className="col-12 mb-4">
                        <label htmlFor="email_address">Email Address <span>*</span></label>
                        <InputText
                          key="email"
                          status={true}
                          name="email"
                          control={control}
                        />
                      </div>

                      <div className="col-12">
                        <div className="custom-control custom-checkbox d-flex align-items-center mb-1">
                          <InputCheckbox
                            key="terms"
                            name="terms"
                            control={control}
                          />
                          <label className="m-0" htmlFor="customCheck1">Terms and conitions</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center mb-1">
                          <InputCheckbox
                            key="account"
                            name="account"
                            control={control}
                          />
                          <label className="m-0" htmlFor="customCheck2">Create an accout</label>
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center">
                          <InputCheckbox
                            key="subscribe"
                            name="subscribe"
                            control={control}
                          />
                          <label className="m-0" htmlFor="customCheck3">Subscribe to our
                            newsletter</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                <div className="order-details-confirmation">

                  <div className="cart-page-heading">
                    <h5>Your Order</h5>
                    <p>The Details</p>
                  </div>

                  <ul className="order-details-form mb-4">
                    <li><span>Product</span> <span>Price</span></li>
                    <li><span>Subtotal</span> <span>$59.90</span></li>
                    <li><span>Shipping</span> <span>Free</span></li>
                    <li><span>Total</span> <span>$59.90</span></li>
                  </ul>

                  <div id="accordion" role="tablist" className="mb-4">
                    <div className="card">
                      <div className="card-header" role="tab" id="headingOne">
                        <h6 className="mb-0">
                          <a data-toggle="collapse" href="#collapseOne" aria-expanded="false"
                             aria-controls="collapseOne"><i className="fa fa-circle-o mr-3"></i>Paypal</a>
                        </h6>
                      </div>

                      <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne"
                           data-parent="#accordion">
                        <div className="card-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales.
                            Phasellus sagittis auctor gravida. Integ er bibendum sodales arcu id te mpus. Ut consectetur
                            lacus.</p>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" role="tab" id="headingTwo">
                        <h6 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false"
                             aria-controls="collapseTwo"><i className="fa fa-circle-o mr-3"></i>cash on delievery</a>
                        </h6>
                      </div>
                      <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo"
                           data-parent="#accordion">
                        <div className="card-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quis in veritatis
                            officia inventore, tempore provident dignissimos.</p>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header" role="tab" id="headingThree">
                        <h6 className="mb-0">
                          <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false"
                             aria-controls="collapseThree"><i className="fa fa-circle-o mr-3"></i>credit card</a>
                        </h6>
                      </div>
                      <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree"
                           data-parent="#accordion">
                        <div className="card-body">
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quo sint repudiandae
                            suscipit ab soluta delectus voluptate, vero vitae</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a href="#" className="btn karl-checkout-btn">Place Order</a>
                </div>
              </div>

            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>

  );
}

export default Checkout;