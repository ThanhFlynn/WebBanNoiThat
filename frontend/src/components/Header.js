import React from 'react';
import logo from '../assets/icon/furniture.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header bg-white p-3 position-fixed top-0 start-0">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className='header-logo'>
            <a href='/' className='d-flex align-items-center justify-content-center'>
              <img src={logo} alt='Logo'></img>
              <p>Furniture</p>
            </a>
          </div>
          <form action='' className='header-form flex-grow-1 postion-relative'>
            <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search"></input>
          </form>
          <ul className='header-action d-flex align-items-center justify-content-center'>
            <li><Link to="#">WISHLIST</Link></li>
            <li><Link to="/accounts/login/">SIGN IN</Link></li>
            <li><Link to="#">MY CART</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
