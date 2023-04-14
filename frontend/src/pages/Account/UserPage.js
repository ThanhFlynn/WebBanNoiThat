import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    let navigate = useNavigate();
    let [authTokens, setAuthTokens] = useState(()=> sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null);
    let [user, setUser] = useState([])

    useEffect(() => {
        if(authTokens == null){
            navigate('/accounts/login');
        }
        getAccount();    
    },[])

    let getAccount = async() =>{
        let response = await fetch('/api/accounts/detail', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access_token)
            }
        })
        let data = await response.json();
        console.log(data);

        if(response.status === 200){
            setUser(data);
        }
    }

    let logOut = e =>{
        sessionStorage.removeItem('info-user-token');
        navigate("/");
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-3 bg-primary p-5'>
                    <ul>
                        <li><p>{user.username}</p></li>
                        <li></li>
                        <li></li>
                        <li><button onClick={logOut}><a>Log Out</a></button></li>
                    </ul>
                </div>
                <div className='col-9 bg-secondary p-5'></div>
            </div>
        </div>
    )
}

export default UserPage
