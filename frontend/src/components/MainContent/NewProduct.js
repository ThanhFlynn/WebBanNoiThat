import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NewProduct = ({pds}) => {

    const navigate = useNavigate();
    const csrftoken = Cookies.get('csrftoken');

    const [menus,setMenus] = useState([]);
    const [categories,setCategories] = useState([]);

    useEffect(() => {
        getMenu();
        getCategories();
    },[])

    let getMenu = async() =>{
        let response = await fetch('/api/getMenus/', {
            headers: {
                'X-CSRFToken' : csrftoken
            }
        });
        let data = await response.json();
        setMenus(data);
    }
    let getCategories = async() =>{
        let response = await fetch('/api/getCategories/', {
            headers: {
                'X-CSRFToken' : csrftoken
            }
        });
        let data = await response.json();
        setCategories(data);
    }

    let createLinkProduct = (item) =>{
        let cate = categories.filter((category) => category.id === item.category);
        let menu = menus.filter((menu) => menu.id === cate[0].menu);
        let str1 = formatName(menu[0].name);
        let str2 = formatName(cate[0].name);
        navigate("/products/"+str1+"/"+str2+"/"+item.product_code);
    }

    let formatName = (name) =>{
        let str="";
        str = name.toLowerCase();
        str = str.trim();
        str = str.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replaceAll(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replaceAll(/đ/g, "d");
        str = str.replaceAll("-"," ");
        str = str.replaceAll("   "," ");
        str = str.replaceAll("  "," ");
        str = str.replaceAll(" ","-");
        return str;
    }

    let AddToWishList = (item) =>{
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
                'Authentication':'Bearer ' + String(auth_token.access_token),
                'X-CSRFToken' : csrftoken
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
    
    let AddToCart = (item) =>{
        const proInCart  = localStorage.getItem('cart-pro') ? JSON.parse(localStorage.getItem('cart-pro')) : null;
        console.log(proInCart);
        if(proInCart === null){
            let pro = [];
            pro.push([item,1]);
            localStorage.setItem('cart-pro',JSON.stringify(pro));
        }else{
            let check = false;
            let checkRemaining = true;
            proInCart.map(pro => {
                if(pro[0].id === item.id){
                    check = true;
                    if(pro[1] < item.quantity){
                        pro[1]++;
                    }
                    else{
                        alert("Không còn sản phẩm này!");
                        checkRemaining = false;
                    }
                }
            })
            if(!checkRemaining)
                return;
            if(!check){
                proInCart.push([item,1]);
            }
            alert("Đã thêm vào giỏ hàng");
            window.location.reload();
            localStorage.setItem('cart-pro',JSON.stringify(proInCart));
        }
    }

    return (
        <div className="container newproducts">
            <h2>Sản phẩm mới nhất</h2>
            <div className='row mt-4'>
                {pds.map((item,index) => {
                    return <div key={index} className='product-item col-6 col-md-3 col-sm-4 text-center'>
                            <div className='product-item-inner'>
                                <Link to="#" onClick={function(event){event.preventDefault();createLinkProduct(item)}}>
                                    <img src={item["image"]} alt="product-img"></img>
                                    <div className='item-content mt-2'>
                                        <div className='title d-flex justify-content-between'>
                                            <p className='product-name text-start'>{item["name"]}</p>
                                            <span onClick={function(event){event.preventDefault();event.stopPropagation();AddToWishList(item)}}>
                                                <i className="fa-regular fa-heart"></i>
                                            </span>
                                        </div>
                                        <p className='price text-end mb-3'>{item["selling_price"].toLocaleString('en-US') + "₫"}</p>
                                        <div className='product-button'>
                                            <div className='product-button-inner d-flex justify-content-between align-items mt-2 mb-2'>
                                                <p className='add-to-cart' onClick={function(event){event.preventDefault();event.stopPropagation();AddToCart(item)}}>Thêm vào giỏ</p>
                                                <p className='buy-now'>Mua ngay</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default NewProduct
