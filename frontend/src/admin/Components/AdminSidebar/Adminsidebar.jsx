import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEye, faSignOut, faAdd } from '@fortawesome/free-solid-svg-icons'
import './Adminsidebar.css'

import { Link, useNavigate } from 'react-router-dom'

const Adminsidebar = () => {
  const navigate = useNavigate();
  const admin= JSON.parse(localStorage.getItem('admin'));
  const username = admin.username;
  return (
    <div className="sidebar-main">
      <div className="side-logo">
        <h1 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>🛍️  Shfonians</h1>
      </div>
      <div className="side-links">
        <div className="link1">
          <FontAwesomeIcon icon={faAdd} size='lg' style={{color: "#367df7",}} />
          <Link to="/admin/add-product"><p>Add Product</p></Link>
        </div>
        <div className="link1">
          <FontAwesomeIcon icon={faEye} size='lg' style={{color: "#424242",}} />
          <Link to="/admin/view-product"><p>View All Product</p></Link>
        </div>

        {/* <div className="link1">
          <FontAwesomeIcon icon={faTruck} size='lg' style={{color: "#367df7",}} />
          <p>All Listed Orders</p>
        </div>
        <div className="link1">
          <FontAwesomeIcon icon={faRss} size='lg' style={{color: "#367df7",}} />
          <p>Your Anaylistics</p>
        </div> */}
        <div className="link1">
          <FontAwesomeIcon icon={faSignOut} size='lg' style={{color: "#367df7",}} />
          <Link to='/admin/login' onClick={(e) => localStorage.removeItem('admin')}><p>Log Out</p></Link>
        </div>
      </div>

      <div className="link2">
        <FontAwesomeIcon icon={faUser} size='lg' style={{color: "#367df7",}} />
        <p>{username}</p>
      </div>
    </div>
  )
}

export default Adminsidebar