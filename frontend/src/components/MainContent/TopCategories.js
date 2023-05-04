import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopCategories = ({pds}) => {
    const config = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    infinite: true,
                    autoplay: true,
                    speed: 500,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    infinite: true,
                    autoplay: true,
                    speed: 500,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 2
                }
            } 
        ]
    };
 
    const [settings, setSettings] = useState(config);
    
    return (
        <div className="container topCategories">
            <h2>Sản phẩm bán chạy</h2>
            <Slider {...settings} className="mt-4 text-center">
                {pds.map((item,index) => {
                    return <div key={index} className="product-item">
                                <img src={item["image"]} alt="product-img"></img>
                                <div className='item-content'>
                                    <div className='title d-flex justify-content-between mt-2'>
                                        <p className='product-name'>{item["name"]}</p>
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                    <p className='price text-end'>{item["price"].toLocaleString('en-US') + "₫"}</p>
                                    <div className='product-button'>
                                        <div className='product-button-inner d-flex justify-content-between align-items mt-2 mb-2'>
                                            <p className='add-to-cart'>Thêm vào giỏ</p>
                                            <Link to="view-detail" className='view-detail'>Xem thêm</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                })}
            </Slider>
        </div>
    )
}

export default TopCategories
