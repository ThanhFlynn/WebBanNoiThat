import React from 'react'

const Footer = () => {

  

  return (
    <div className='footer-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-10 offset-1 col-md-4 offset-md-0 footer-item text-uppercase'>
            <strong>Trợ giúp & Hỗ trợ</strong>
            <ul className='list-contact'>
              <li>
                <a href='#'>Liên hệ với chúng tôi</a>
              </li>
              <li>
                <a href='#'>Đặt hàng</a>
              </li>
              <li>
                <a href='#'>SHIPPING</a>
              </li>
              <li>
                <a href='#'>Hủy & Trả hàng</a>
              </li>
              <li>
                <a href='#'>Giảm giá</a>
              </li>
              <li>
                <a href='#'>Thẻ quà tặng</a>
              </li>
              <li>
                <a href='#'>Mua sắm an toàn</a>
              </li>
            </ul>
          </div>
          <div className='col-10 offset-1 col-md-4 offset-md-0 footer-item text-uppercase'>
            <strong>Về chúng tôi</strong>
            <ul className='list-contact'>
              <li>
                <a href='#'>Về FURNITURE</a>
              </li>
              <li>
                <a href='#'>Mua theo danh mục</a>
              </li>
              <li>
                <a href='#'>Chương trình thương mại</a>
              </li>
              <li>
                <a href='#'>Sự bền vững</a>
              </li>
              <li>
                <a href='#'>Điểm nhấn</a>
              </li>
              <li>
                <a href='#'>Thiết kế BLOG</a>
              </li>
              <li>
                <a href='#'>Khả năng tiếp cận</a>
              </li>
            </ul>
          </div>
          <div className='col-10 offset-1 col-md-4 offset-md-0 footer-item'>
            <div className='part-text'>
              <strong>Chương trình thương mại</strong>
              <p>Tham gia Chương trình Thương mại của chúng tôi để tiếp cận giá cả và lợi ích thương mại.</p>
            </div>
            <div className='part-text'>
              <strong>DỊCH VỤ KHÁCH HÀNG</strong>
              <p>1-888-222-4410 | 6am-4pm PT M-F</p>
            </div>
            <div className='part-text'>
              <strong>Mới nhất</strong>
              <p>Tham gia danh sách của chúng tôi để truy cập độc quyền vào các sự kiện.</p>
            </div>
            <div className='social-media d-flex'>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-pinterest"></i>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row text-start'>
          <div className='col-12'>
            <p>Copyright @ 2023 by Furniture - All right</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
