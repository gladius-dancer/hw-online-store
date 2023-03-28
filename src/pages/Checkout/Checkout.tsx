import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setPriceAction } from "../../store/priceReduser";
import { InputText } from "../../components/FormComponents/InputText";
import { Dropdown } from "../../components/FormComponents/Dropdown";
import { InputCheckbox } from "../../components/FormComponents/Checkbox";
import { FormHelperText } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const options = [
  {
    label: "Karakalpakstan",
    value: "1"
  },
  {
    label: "United Kingdom",
    value: "2"
  },
  {
    label: "Germany",
    value: "3"
  },
  {
    label: "United States",
    value: "4"
  }
];

function Checkout() {

  const dispatch = useAppDispatch();
  const nav = useAppSelector(state => state.changeNAv);
  const cart = useAppSelector(state => state.cart);
  const price: any = useAppSelector(state => state.price);
  const shipping: any = useAppSelector(state => state.shipping);

  const [cash, setCash] = useState(false);
  const [terms, setTerms] = useState(false);
  const [account, setAccount] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [cashError, setCashError] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [accountError, setAccountError] = useState(false);
  // const [subscribeError, setSubscribeError] = useState(false);
  const [paypal, setPaypal] = useState(true);
  const [card, setCard] = useState(false);


  const [expanded, setExpanded] = React.useState<string | boolean>("1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const priceCalc = () => {
    const totalPrice = cart.reduce((summ: number, current: any) => {
      return summ + (current.price * current.count);
    }, 0);

    dispatch(setPriceAction({ totalPrice: totalPrice, shipping: 0 }));
    return totalPrice;
  };

  useEffect(() => {
    if (expanded === "1") {
      setPaypal(true);
      setCard(false);
      setCash(true);
    }
    else if (expanded === "2") {
      setPaypal(false);
      setCard(true);
      setCash(true);
    }
    else {
      setPaypal(false);
      setCard(false);
      setCash(false);
    }
  }, [expanded]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(priceCalc()));
    localStorage.setItem("shipping", JSON.stringify(shipping));

  }, [cart, shipping]);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    country: yup.string().required(),
    address: yup.string().required(),
    number: yup.string().required(),
    postalCode: yup.string().required(),
    paypal: paypal ? yup.string().required() : "",
    card: card ? yup.string().required() : ""
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit, control, setValue, formState: { errors } } = methods;
  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();

    if (!terms) {
      setTermsError(true);
    }
    // if (!subscribe) {
    //   setSubscribeError(true);
    // }
    if (!account) {
      setAccountError(true);
    }
    if (!cash) {
      setCashError(true);
    }
    if (terms && account && cash) {
      alert("Successfully");
    }
  };

  const termsChange = (event: any) => {
    setTerms(event.target.checked);
    setTermsError(false);
  };
  const accountChange = (event: any) => {
    setAccount(event.target.checked);
    setAccountError(false);
  };
  const subscribeChange = (event: any) => {
    setSubscribe(event.target.checked);
    setSubscribeError(false);
  };
  const setCashMethod = (event: any) => {
    setCash(event.target.checked);
    setCashError(false);
  };


  return (
    <>
      <Categories />
      <div id="wrapper" className={nav ? "karl-side-menu-open" : ""}>
        <Header />
        <div className="checkout_area pt-30 mb-50">
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} className="row" action="#" method="post">

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
                        <p className="ml-15">
                          {errors.country && <FormHelperText error>{errors.country.message}</FormHelperText>}
                        </p>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="street_address">Address <span>*</span></label>
                        <InputText
                          key="address"
                          status={true}
                          name="address"
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
                            label="Terms and conitions"
                            checked={terms}
                            onChange={termsChange}
                            error={termsError}
                          />
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center mb-1">
                          <InputCheckbox
                            key="account"
                            name="account"
                            control={control}
                            label="Create an accout"
                            checked={account}
                            onChange={accountChange}
                            error={accountError}
                          />
                        </div>
                        <div className="custom-control custom-checkbox d-flex align-items-center">
                          <InputCheckbox
                            key="subscribe"
                            name="subscribe"
                            control={control}
                            label="Subscribe to our newsletter"
                            checked={subscribe}
                            onChange={subscribeChange}
                          />
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
                    <li><span>Subtotal</span> <span>$ {parseFloat(price.totalPrice).toFixed(2)}</span></li>
                    <li><span>Shipping</span>
                      <span>{shipping[shipping.current] > 0 ? shipping[shipping.current] : "Free"}</span></li>
                    <li><span>Total</span>
                      <span>$ {parseFloat(price.totalPrice + shipping[shipping.current]).toFixed(2)}</span></li>
                  </ul>


                  <div className="mb-30">
                    <Accordion expanded={expanded === "1"} onChange={handleChange("1")}>
                      <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>PAYPAL</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <InputText
                          key="paypal"
                          status={true}
                          name="paypal"
                          control={control}
                        />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "2"} onChange={handleChange("2")}>
                      <AccordionSummary
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>CREDIT CARD</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <InputText
                          key="card"
                          status={true}
                          name="card"
                          control={control}
                        />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === "3"} onChange={handleChange("3")}>
                      <AccordionSummary
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography>CASH ON DELIEVERY</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <InputCheckbox
                          key="cash"
                          name="cash"
                          control={control}
                          label="I agree to pay in cash"
                          checked={cash}
                          onChange={setCashMethod}
                          error={cashError}
                        />
                      </AccordionDetails>
                    </Accordion>

                  </div>

                  <button type="submit" className="btn karl-checkout-btn">Place Order</button>
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