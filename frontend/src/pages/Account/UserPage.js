import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserPage = () => {
    let navigate = useNavigate();
    let [authTokens, setAuthTokens] = useState(()=> sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null);
    let [user, setUser] = useState([]);
    let { accountAction }= useParams();

    let logOut = e =>{
        sessionStorage.removeItem('info-user-token');
        window.location.reload();
    }

    useEffect(() => {
        if(authTokens == null){
            navigate('/accounts/login');
        }
        getAccount();    
        console.log(accountAction);
    },[])

    let getAccount = async() =>{
        let response = await fetch('/api/accounts/detail/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(authTokens.access_token)
            }
        })
        let data = await response.json();

        if(response.status === 401){
            logOut();
        }

        if(response.status === 200){
            setUser(data);
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-3 bg-primary p-5'>
                    <ul>
                        <li><p>{user.username}</p></li>
                        <li><Link>Lịch sử mua hàng</Link></li>
                        <li><a href='/#/accounts/update'>Cập nhật tài khoản</a></li>
                        <li><a href='/#/accounts/wishlist'>Danh sách yêu thích</a></li>
                        <li><Link onClick={logOut}>Đăng xuất</Link></li>
                    </ul>
                </div>
                <div className='col-9 bg-secondary p-5'>

                </div>
            </div>
        </div>
    )
}

export default UserPage
