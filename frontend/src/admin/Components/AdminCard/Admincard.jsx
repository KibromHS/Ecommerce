import React from 'react';
import './Admincard.css';

const Admincard = ({ _id, price, name, image, description, handleDelete }) => {
  return (
    <div className="admin-card">
      <div className="admin-card-image">
        <img src={image} alt={name} className="product-image" />
      </div>

      <div className="admin-card-text">
        <div className="up-head">
          <h2>{name}</h2>
          <p>ብር {price}</p>
        </div>
        <p className="detail">
          {description}
        </p>
      </div>

      <div className="delete-button" onClick={() => handleDelete(_id)}>
        <h1>Delete Now</h1>
      </div>
    </div>
  );
};

export default Admincard;
