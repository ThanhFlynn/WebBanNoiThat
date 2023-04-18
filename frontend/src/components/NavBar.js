import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <ul className='navbar bg-white'>
        <li><Link>phòng khách</Link></li>
        <li><Link>phòng ăn</Link></li>
        <li><Link>phòng ngủ</Link></li>
        <li><Link>trang trí và đa dụng</Link></li>
        <li><Link>thiết kế nội thất</Link></li>
        <li><Link>blog tư vấn</Link></li>
        <li><Link>sản phẩm khuyến mại</Link></li>
    </ul>
  )
}

export default NavBar
