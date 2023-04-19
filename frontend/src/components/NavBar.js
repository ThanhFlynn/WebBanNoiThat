import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <ul className='nav-menu'>
      <li className='room'>
        <Link to="#" className='nav-title'>Phòng khách</Link>
        <div className='nav-dropdown'>
          <a href='#'>Sofa da</a>
          <a href='#'>Sofa vải</a>
          <a href='#'>Sofa giường</a>
          <a href='#'>Bàn trà</a>
          <a href='#'>Ghế thư giãn</a>
          <a href='#'>Tủ - Kệ</a>
        </div>
      </li>
      <li className='room'>
        <Link to="#" className='nav-title'>Phòng ăn</Link>
        <div className='nav-dropdown'>
          <a href='#'>Bàn ăn thông minh mở rộng</a>
          <a href='#'>Ghế ăn</a>
        </div>
      </li>
      <li className='room'>
        <Link to="#" className='nav-title'>Phòng ngủ</Link>
        <div className='nav-dropdown'>
          <a href='#'>Phòng ngủ người lớn</a>
          <a href='#'>Phòng ngủ trẻ em</a>
        </div>
      </li>
      <li className='room'>
        <Link to="#" className='nav-title'>Trang trí và gia dụng</Link>
        <div className='nav-dropdown'>
          <a href='#'>Tượng trang trí</a>
          <a href='#'>Tranh - Khung ảnh</a>
          <a href='#'>Lọ trang trí</a>
          <a href='#'>Đèn trang trí</a>
          <a href='#'>Thảm</a>
          <a href='#'>Gối tựa sofa</a>
          <a href='#'>Gương trang trí</a>
          <a href='#'>Hoa giả</a>
          <a href='#'>Đồ dùng bàn ăn</a>
        </div>
      </li>
      <li>
        <Link to="#" className='nav-title'>Thiết kế nội thất</Link>
      </li>
      <li>
        <Link to="#" className='nav-title'>Blog tư vấn</Link>
      </li>
      <li>
        <Link to="#" className='nav-title'>Sản phẩm khuyến mại</Link>
      </li>
    </ul>
  )
}

export default NavBar
