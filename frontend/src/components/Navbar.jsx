import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/action/authActions';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const cartState = useSelector(state => state.handleCart);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.status === 200) dispatch(logout());
      else alert(data.message);
    } catch (e) {
      console.error(e);
      alert('something went wrong');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">Shfonians</NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            {isAuthenticated ? (
              <>
                <span className="navbar-text m-2">Welcome, {user?.fullName.split(' ')[0] || 'User'}!</span>
                <button onClick={handleLogout} className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-out-alt mr-1"></i> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-outline-dark m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-dark m-2">
                  <i className="fa fa-user-plus mr-1"></i> Register
                </NavLink>
              </>
            )}
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fa fa-cart-shopping mr-1"></i> Cart ({cartState.length})
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
