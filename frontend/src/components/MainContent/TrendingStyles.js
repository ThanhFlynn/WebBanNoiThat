import React from 'react'

const TrendingStyles = () => {
    return (
        <div className='trending-style mt-5'>
            <div className='container'>
                <h2 className='text-center'>Trending Styles</h2>
                <div className='row mt-5'>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 trending-content'>
                        <img src='https://www.2modern.com/cdn/shop/files/homepage_3_up_midcentury_380x.jpg?v=1638814897' alt="trending-img-1"></img>
                        <div className='text-center mt-3'>
                            <p className='hp-section--3up__title'>Giữa thế kỷ hiện đại</p>
                            <p className='hp-section--3up__text'>Các thiết kế có đường nét rõ ràng mang đến hình thức tinh tế và vẻ đẹp chức năng cho tính thẩm mỹ vượt thời gian.</p>
                        </div>
                    </div>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 trending-content'>
                        <img src='https://www.2modern.com/cdn/shop/files/homepage_3_up_scandi_380x.jpg?v=1638814897' alt='trending-img-2'></img>
                        <div className='text-center mt-3'>
                            <p className='hp-section--3up__title'>THIẾT KẾ SCANDINAVIA</p>
                            <p className='hp-section--3up__text'>Các thiết kế lấy cảm hứng được chế tạo theo truyền thống Bắc Âu về chủ nghĩa tối giản, vẻ đẹp đơn giản và chức năng thuần túy.</p>
                        </div>
                    </div>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 trending-content'>
                        <img src='https://www.2modern.com/cdn/shop/files/homepage_3_up_farmhouse_380x.jpg?v=1638907088' alt='trending-img-3'></img>
                        <div className='text-center mt-3'>
                            <p className='hp-section--3up__title'>TRANG TRẠI HIỆN ĐẠI</p>
                            <p className='hp-section--3up__text'>Sự tinh tế mộc mạc đáp ứng sự thanh lịch giản dị trong phong cách tươi mới lấy cảm hứng từ đồng quê hiện đại của trang trại.</p>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default TrendingStyles
