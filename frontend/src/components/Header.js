import React, {useState, useEffect} from 'react';
import logo from '../assets/icon/furniture.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  let navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [numberCart, setNumberCart] = useState(0);

  useEffect(() => {
    if(sessionStorage.getItem('info-user-token'))
      setIsLogin(true);
    const proInCart  = localStorage.getItem('cart-pro') ? JSON.parse(localStorage.getItem('cart-pro')) : null;
    if(proInCart === null)
      setNumberCart(0);
    else{
      let sum=0;
      proInCart.map(pro =>{
        sum += Number(pro[1]);
      })
      setNumberCart(sum);
    }
  },[])

  let logOut = e =>{
    e.preventDefault();
    sessionStorage.removeItem('info-user-token');
    window.location.reload();
  }

  let handleActiveNav = e =>{
    e.preventDefault();
    let nav_menu = document.getElementsByClassName("nav-menu");
    nav_menu[0].classList.toggle("activeNav");
  }

  let redirectToWishList = e =>{
    e.preventDefault();
    if(isLogin){
      navigate("/accounts/wishlist");
    }else{
      alert("Vui lòng đăng nhập!");
      navigate("/accounts/login");
    }
  }

  return (
    <div className="header bg-white p-3 position-fixed top-0 start-0">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between">
          <div className='header-logo d-flex align-items-center justify-content-between'>
            <div className='menu-bars' onClick={handleActiveNav}>
              <i class="fa-solid fa-bars"></i>
            </div>
            <a href='/' className='d-flex align-items-center justify-content-center'>
              <img src={logo} alt='Logo'></img>
              <p>Furniture</p>
            </a>
          </div>
          <form action='' className='header-form flex-grow-1 postion-relative'>
            <input type="search" class="form-control form-control-dark" placeholder="Tìm kiếm..." aria-label="Search"></input>
          </form>
          <ul className='header-action d-flex align-items-center justify-content-center'>
            <li>
              <Link className='d-flex align-items-center justify-content-center' onClick={redirectToWishList}>
                <i className="fa-regular fa-heart"></i>
                <p>yêu thích</p>
              </Link>
            </li>
            <li>
              {isLogin === false ? (
                <Link to="/accounts/login/" className='d-flex align-items-center justify-content-center'>
                  <i className="fa-regular fa-circle-user"></i>
                  <p>đăng nhập</p>
                </Link>
                ) : (
                <div className='account-section'>
                  <div className='d-flex align-items-center justify-content-center'>
                    <i className="fa-regular fa-circle-user"></i>
                    <p className='text-uppercase'>tài khoản</p>
                  </div>
                  <ul className='accounts-choice'>
                    <li><Link to='/accounts'>Lịch sử mua hàng</Link></li>
                    <li><Link to='/accounts/update'>Cập nhật tài khoản</Link></li>
                    <li><Link to='/accounts/changepassword'>Thay đổi mật khẩu</Link></li>
                    <li><Link to='/accounts/wishlist'>Danh sách yêu thích</Link></li>
                    <li><Link onClick={logOut}>Đăng xuất</Link></li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link to="/cart" className='d-flex align-items-center justify-content-center'>
                <i className="fa-solid fa-cart-shopping"></i>
                <p>giỏ hàng{numberCart ? "("+numberCart+")" : null}</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
