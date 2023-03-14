import React from "react";
import images from "../../assets/images";

function MainSlider() {
  return (
    <section className="welcome_area">
      <div className="welcome_slides owl-carousel">

        {/* Single Slide Start */}
        <div className="single_slide height-800 bg-img background-overlay"
             style={{ background: `url(${images.bg1})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="welcome_slide_text">
                  <h6 data-animation="bounceInDown" data-delay="0" data-duration="500ms">* Only today we offer free
                    shipping</h6>
                  <h2 data-animation="fadeInUp" data-delay="500ms" data-duration="500ms">Fashion Trends</h2>
                  <a href="#" className="btn karl-btn" data-animation="fadeInUp" data-delay="1s" data-duration="500ms">Shop
                    Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Slide Start */}
        <div className="single_slide height-800 bg-img background-overlay"
             style={{ background: `url(${images.bg2})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="welcome_slide_text">
                  <h6 data-animation="fadeInDown" data-delay="0" data-duration="500ms">* Only today we offer free
                    shipping</h6>
                  <h2 data-animation="fadeInUp" data-delay="500ms" data-duration="500ms">Summer Collection</h2>
                  <a href="#" className="btn karl-btn" data-animation="fadeInLeftBig" data-delay="1s"
                     data-duration="500ms">Check Collection</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Slide Start */}
        <div className="single_slide height-800 bg-img background-overlay"
             style={{ background: `url(${images.bg3})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="welcome_slide_text">
                  <h6 data-animation="fadeInDown" data-delay="0" data-duration="500ms">* Only today we offer free
                    shipping</h6>
                  <h2 data-animation="bounceInDown" data-delay="500ms" data-duration="500ms">Women Fashion</h2>
                  <a href="#" className="btn karl-btn" data-animation="fadeInRightBig" data-delay="1s"
                     data-duration="500ms">Check Collection</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Slide Start */}
        <div className="single_slide height-800 bg-img background-overlay"
             style={{ background: `url(${images.bg4})` }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="welcome_slide_text">
                  <h6 data-animation="fadeInDown" data-delay="0" data-duration="500ms">* Only today we offer free
                    shipping</h6>
                  <h2 data-animation="bounceInDown" data-delay="500ms" data-duration="500ms">Women Fashion</h2>
                  <a href="#" className="btn karl-btn" data-animation="fadeInRightBig" data-delay="1s"
                     data-duration="500ms">Check Collection</a>
                </div>
              </div>
            </div>
          </div>
        </div>



        </div>
    </section>
);
}

export default MainSlider;