import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TopCategories = () => {
    const config = {
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    infinite: true,
                    autoplay: true,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    infinite: true,
                    autoplay: true,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 2
                }
            } 
        ]
    };
 
    const [settings, setSettings] = useState(config);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    },[])

    let getProducts = async() =>{
        let response = await fetch("/api/getProducts/");
        let data = await response.json();
        data.sort(function(a,b){
            return b["purchases"] - a["purchases"];
        });
        let product_item = [];
        for(let i=0; i<6; ++i)
            product_item[i] = data[i];
        setProducts(product_item);
    }
    
    return (
        <div className="container topCategories mb-5">
            <h2>Sản phẩm bán chạy</h2>
            <Slider {...settings} className="mt-4 text-center">
                {products.map((item,index) => {
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
                                            <Link to="add-to-cart" className='add-to-cart'>Thêm vào giỏ</Link>
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
