import React, { useEffect, useState } from 'react';
import './Viewproduct.css';
import Adminsidebar from '../Components/AdminSidebar/Adminsidebar';
import Admincard from '../Components/AdminCard/Admincard';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Viewproduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();
      if (response.ok) {
        toast(data.message);
        window.location.reload();
      } else toast.error(data.message);
    } catch (e) {
      console.error('Error', e);
      toast.error('Failed to delete product');
    }
  }

  if (isLoading) {
    return (
      <div className="view-main">
        <Adminsidebar />
        <div className="cards">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="view-main">
      <Adminsidebar />
      <div className="cards">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Admincard key={index} {...product} handleDelete={handleDelete} />
          ))
        ) : (
          <h1>There is No Data Present</h1>
        )}
      </div>
    </div>
  );
};

export default Viewproduct;
