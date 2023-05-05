import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import UpdateAccount from './AccountAction/UpdateAccount';
import ChangePassword from './AccountAction/ChangePassword';
import ProductWishList from './AccountAction/ProductWishList';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);


const UserPage = () => {
    let navigate = useNavigate();
    let [authTokens, setAuthTokens] = useState(()=> sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null);
    let [user, setUser] = useState({});
    let { accountAction }= useParams();

    let logOut = e =>{
        sessionStorage.removeItem('info-user-token');
        window.location.reload();
    }

    useEffect(() => {
        if(authTokens == null){
            navigate('/');
        }
        getAccount();    
        if(accountAction === undefined)
            accountAction = null;
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
                    {accountAction == null ? (
                        <p>Hello</p>
                    ) : (
                        accountAction == "update" ? (
                            <UpdateAccount user={user} authTokens={authTokens}/>
                        ):(
                            accountAction == "wishlist" ? (
                                <ProductWishList />
                            ):(
                                accountAction == "changepassword" ? (
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
