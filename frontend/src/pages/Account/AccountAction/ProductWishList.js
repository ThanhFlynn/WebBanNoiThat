import React,{useState, useEffect} from 'react'
import DivPageProductWish from '../../../components/PageProduct/DivPageProductWish';
import Cookies from 'js-cookie';

const ProductWishList = () => {
    const [pdwish, setPdwish] = useState([]);
    
    useEffect(() => {
        const csrftoken = Cookies.get('csrftoken');
        const authTokens = sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null;
        let logOut = () =>{
            sessionStorage.removeItem('info-user-token');
            window.location.reload();
        }
        let getWishList = async() =>{
            let response = await fetch('/api/getWishList/', {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication':'Bearer ' + String(authTokens.access_token),
                    'X-CSRFToken' : csrftoken
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
                setPdwish(data);
            }
        }
        getWishList();
    },[])

    return (
        <div className='wish_list'>
            <div className='container'>
                <div className='row'>
                    <h2>Danh sách sản phẩm yêu thích</h2>
                    {pdwish.length === 0? (
                        <h4 className='text-center mt-5'>Chưa có sản phẩm yêu thích nào</h4>
                    ): null}
                    <DivPageProductWish itemsPerPage={12} items={pdwish}/>
                </div>
            </div>
        </div>
    )
}

export default ProductWishList
