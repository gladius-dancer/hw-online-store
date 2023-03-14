import React from "react";
import images from "../../assets/images";
import { changeNavAction } from "../../store/changeNavReduser";
import { InputText } from "../../components/FormComponents/InputText";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Login() {

  const schema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required().min(4),
  });


  const methods = useForm({resolver: yupResolver(schema)});
  const {handleSubmit, control, setValue, formState: {errors}} = methods;
  const onSubmit = (data: any) => console.log(data);


  return (
    <div>
      <header className="header_area">
        <div className="top_header_area">
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
              <div className="col-12 col-lg-7">
                <div className="top_single_area d-flex align-items-center justify-content-center">
                  {/* Logo Area */}
                  <div className="logo">
                    <a href="#"><img src={images.logo} alt=""/></a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
      <section className="login-form d-flex justify-content-center align-content-center">
          <div className="checkout_details_area mb-50 mx-auto clearfix col-md-4">

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="column">
                <div className="col-md-12 mb-3">
                  <label htmlFor="first_name">Login <span>*</span></label>
                  <InputText key="name" name="login" control={control} status={true}/>
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="last_name">Password <span>*</span></label>
                  <InputText key="password" name="password" control={control} status={true}/>
                </div>
                <button className="karl-checkout-btn">Login</button>

              </div>
            </form>
        </div>
      </section>
      <footer className="mt-20 mb-50">
        <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer_social_area text-center">
                  <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                </div>
              </div>
            </div>
        </div>
      </footer>
    </div>

  );
}

export default Login;