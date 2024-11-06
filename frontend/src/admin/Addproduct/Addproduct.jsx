import React, { useState } from 'react';
import Adminsidebar from '../Components/AdminSidebar/Adminsidebar';
import './Addproduct.css';
import toast from 'react-hot-toast';

const Addproduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Convert the selected file to a Base64 string
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageBase64(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: imageBase64,
          category,
          title: name,
          price,
          description: detail
        })
      });

      if (response.status === 201) {
        toast.success('Product added to the database');
      } else {
        toast.error('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error occurred while adding the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-main">
      <Adminsidebar />
      <div className="add-form-data">
        <h1 className="add-heading">Add Product 🔔</h1>
        <p className="heading-p">
          Add details of your product along with an image to the database.
        </p>
        <div className="border"></div>
        {loading ? (
          <h2 className="m-20">Uploading...</h2>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="product-form">
              <div className="textfield">
                <h5>Product Name 🛒</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="Product Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="textfield">
                <h5>Product Detail 📢</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="Product Description"
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
              <div className="textfield">
                <h5>Product Price 💸</h5>
                <input
                  type="text"
                  className="addproducttext"
                  placeholder="Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="textfield">
                <h5>Product Category 🌩️</h5>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="admin-dropdown"
                >
                  <option value="">Select Category</option>
                  <option value="Men's Clothing">Men's Clothing 👔</option>
                  <option value="Women's Clothing">Women's Clothing 👗</option>
                  <option value="Jewelleries">Jewelleries 💍</option>
                </select>
              </div>
              <div className="textfield">
                <h5>Add Product Image</h5>
                <input
                  type="file"
                  className="addproducttext"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="submitbutton">
                Enlist Now 🗾
              </button>
            </div>
          </form>
        )}
        <div className="image-part">
          {imageBase64 ? (
            <img src={imageBase64} alt="product" className="pro-image" />
          ) : (
            <p>Please select an image</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
