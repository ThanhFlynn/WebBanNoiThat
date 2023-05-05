import React from 'react'
import { useNavigate } from 'react-router-dom';

const NewProduct = ({pds}) => {

    const navigate = useNavigate();

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
        <div className="container newproducts">
            <h2>Sản phẩm mới nhất</h2>
            <div className='row mt-4'>
                {pds.map((item,index) => {
                    return <div key={index} className='product-item col-6 col-md-3 col-sm-4 text-center'>
                            <div className='product-item-inner'>
                                <img src={item["image"]} alt="product-img"></img>
                                <div className='item-content mt-2'>
                                    <div className='title d-flex justify-content-between'>
                                        <p className='product-name'>{item["name"]}</p>
                                        <span onClick={function(event){event.preventDefault();AddToCart(item)}}>
                                            <i className="fa-regular fa-heart"></i>
                                        </span>
                                    </div>
                                    <p className='price text-end mb-2'>{item["price"].toLocaleString('en-US') + "₫"}</p>
                                </div>
                            </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default NewProduct
