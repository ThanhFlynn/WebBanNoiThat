import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import UpdateAccount from './AccountAction/UpdateAccount';
import ChangePassword from './AccountAction/ChangePassword';
import ProductWishList from './AccountAction/ProductWishList';

const UserPage = () => {
    let navigate = useNavigate();
    let authTokens = sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null;
    let [user, setUser] = useState({});
    let { accountAction }= useParams();

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
        
        let data = await response.json();

        if(response.status === 200){
            setUser(data);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 p-5'>
                    {accountAction === undefined ? (
                        <p>Hello</p>
                    ) : (
                        accountAction === "update" ? (
                            <UpdateAccount user={user} authTokens={authTokens}/>
                        ):(
                            accountAction === "wishlist" ? (
                                <ProductWishList />
                            ):(
                                accountAction === "changepassword" ? (
                                    <ChangePassword authTokens={authTokens}/>
                                ):null
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserPage
