import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
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

    const navigate = useNavigate();
 
    const [settings, setSettings] = useState(config);

    let AddToCart = (item) =>{
        let auth_token = sessionStorage.getItem('info-user-token');
        if(auth_token !== null)
            postWishList(item, JSON.parse(auth_token));
        else{
            alert("Vui lòng đăng nhập để thực hiện thao tác này");
            navigate("/accounts/login/");
        }
    }

    async function postWishList(item, auth_token){
        let response = await fetch('/api/postWishList/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(auth_token.access_token)
            },
            body: JSON.stringify(item)
        })

        if(response.status === 401){
            alert("Hết phiên đăng nhập vui lòng đăng nhập lại!");
            navigate("/accounts/login/");
        }
        else if(response.status === 400){
            alert("Something wrong!");
        }else if(response.status === 200){
            let data = await response.json();
            alert(data.message);
        }
    }
    
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
                                        <span onClick={function(event){event.preventDefault();AddToCart(item)}}>
                                            <i className="fa-regular fa-heart"></i>
                                        </span>
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
