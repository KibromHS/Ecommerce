import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center">
        <div className="d-flex align-items-center justify-content-center pb-5">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0">Made by {" "}
              <a  href="https://kibrom.netlify.app" className="text-decoration-underline text-dark fs-5" target="_blank" rel="noreferrer">Shfonians N3</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
