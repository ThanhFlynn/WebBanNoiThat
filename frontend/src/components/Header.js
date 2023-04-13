import React, {useState, useEffect} from 'react';
import logo from '../assets/icon/furniture.png';
import { Link } from 'react-router-dom';

const Header = () => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('info-user-token'))
      setIsLogin(true);
  },[])

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
            <li>
              <Link to="#" className='d-flex align-items-center justify-content-center'>
                <i class="fa-regular fa-heart"></i>
                <p>WISHLIST</p>
              </Link>
            </li>
            <li>
              {isLogin === false ? (
                <Link to="/accounts/login/" className='d-flex align-items-center justify-content-center'>
                  <i class="fa-regular fa-circle-user"></i>
                  <p>SIGN IN</p>
                </Link>
                ) : (
                <Link to="/accounts" className='d-flex align-items-center justify-content-center'>
                  <i class="fa-regular fa-circle-user"></i>
                  <p>MY ACCOUNT</p>
                </Link>
              )}
            </li>
            <li>
              <Link to="#" className='d-flex align-items-center justify-content-center'>
                <i class="fa-solid fa-cart-shopping"></i>
                <p>MY CART</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
