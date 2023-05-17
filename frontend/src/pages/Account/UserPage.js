import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UpdateAccount from './AccountAction/UpdateAccount';
import ChangePassword from './AccountAction/ChangePassword';
import ProductWishList from './AccountAction/ProductWishList';
import Cookies from 'js-cookie';
import Page404 from '../Page404';
import OrderHistory from './AccountAction/Order/OrderHistory';

const UserPage = () => {
    let navigate = useNavigate();
    let authTokens = sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null;
    let [user, setUser] = useState({});
    let { accountAction }= useParams();
    const csrftoken = Cookies.get('csrftoken');

    let logOut = e =>{
        sessionStorage.removeItem('info-user-token');
        window.location.reload();
    }

    useEffect(() => {
        if(authTokens === null){
            navigate('/');
        }
        getAccount();
    },[])

    let getAccount = async() =>{
        let response = await fetch('/api/accounts/detail/', {
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
        
        let data = await response.json();

        if(response.status === 200){
            setUser(data);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 py-5'>
                    {accountAction === undefined ? (
                        <OrderHistory />
                    ) : (
                        accountAction === "update" ? (
                            <UpdateAccount user={user} authTokens={authTokens}/>
                        ):(
                            accountAction === "wishlist" ? (
                                <ProductWishList />
                            ):(
                                accountAction === "changepassword" ? (
                                    <ChangePassword authTokens={authTokens}/>
                                ):(
                                    <Page404 />
                                )
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserPage
