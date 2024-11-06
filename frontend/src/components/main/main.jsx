import React from "react";
import image from '../../img/image.png';
import './main.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <h5 className="card-title fs-1 text fw-lighter">የኛ ፈጠራችን ባህላችን</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
                የተለያዩ የኢትዮጵያ የባህል አልባሳት እና ጌጣጌጥ እንሸጣለን።
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="header">
        <div className="left-header">
          <h1>Grab Upto 50% off on</h1>
          <h1>Selected products</h1>
          <p>We are the world best e commerce online store and nominated for best serving agnecy across the world so trust on use for better quality</p>
          <p className='check-button' onClick={() => navigate('/product')}> Check Now 🛍️</p>
        </div>
        <div className="right-header">
          <img src={image} alt="main" />
        </div>
      </div>
    </>
    
  );
};

export default Home;
