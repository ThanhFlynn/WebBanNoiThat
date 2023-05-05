import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const ProductWishList = () => {

    let navigate = useNavigate();

    const [authTokens, setAuthTokens] = useState(()=> sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null);
    const [pdwish, setPdwish] = useState([]);

    useEffect(() => {
        getWishList();
    },[])

    let getWishList = async() =>{
        let response = await fetch('/api/getWishList/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(authTokens.access_token)
            }
        })
        
        if(response.status === 401){
            alert("Phiên đăng nhập đã hết! Vui lòng đăng nhập lại!");
            logOut();
        }

        if(response.status === 500){
            logOut();
        }

        if(response.status === 200){
            let data = await response.json();
            console.log(data);
            setPdwish(data);
        }
    }

    let logOut = () =>{
        sessionStorage.removeItem('info-user-token');
        window.location.reload();
    }

    let handleDeleteItem = (item) =>{
        console.log(JSON.stringify(item,null,2));
        deleteItemWishList(item,authTokens);
    }

    async function deleteItemWishList(item, auth_token){
        let response = await fetch('/api/deleteItemWishList/', {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(auth_token.access_token)
            },
            body: JSON.stringify(item)
        })

        if(response.status === 401){
            alert("Hết phiên đăng nhập vui lòng đăng nhập lại!");
            navigate("/accounts/login/");
        }else if(response.status === 200){
            window.location.reload();
        }
    }

    return (
        <div className='wish_list'>
        <div className='container'>
            <div className='row'>
                <h2>Danh sách sản phẩm yêu thích</h2>
                {pdwish.length == 0? (
                    <h4 className='text-center mt-5'>Chưa có sản phẩm yêu thích nào</h4>
                ): null}
                {pdwish.map((item,index) => {
                    return <div key={index} className='product-item col-6 col-md-3 col-sm-4 text-center'>
                            <div className='product-item-inner'>
                                <span className='delete-item' onClick={(event) =>{event.preventDefault(); handleDeleteItem(item);}}>
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </span>
                                <img src={item["image"]} alt="product-img"></img>
                                <div className='item-content mt-2'>
                                    <div className='title d-flex justify-content-between'>
                                        <p className='product-name'>{item["name"]}</p>
                                        <span>
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
        </div>
    )
}

export default ProductWishList
