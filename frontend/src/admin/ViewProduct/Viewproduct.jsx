import React, { useEffect, useState } from 'react'
import './Viewproduct.css'
import Adminsidebar from '../Components/AdminSidebar/Adminsidebar'
import Admincard from '../Components/AdminCard/Admincard'

const Viewproduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error('Error', e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if(isLoading){
    return (
      <div className='view-main'>
        <Adminsidebar />
        <div className='cards'>
          <h1>Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="view-main">
      <Adminsidebar/>
      <div className="cards">
        {
          products.length > 0 ? products.map((p , index) => {
            return <Admincard  key={index+1} {...p}/>
          }) :<h1>There is No Data Present</h1>
        }
      </div>

    </div>
    </>
  )
}

export default Viewproduct