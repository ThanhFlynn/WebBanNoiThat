import React, {useState, useEffect} from 'react'
import jwt_decode from "jwt-decode"

const UserPage = () => {

    let [authTokens, setAuthTokens] = useState(()=> sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null);
    let [user, setUser] = useState([])

    useEffect(() => {
        getAccount();    
    },[])

    let getAccount = async() =>{
        let userAuth = jwt_decode(authTokens.access_token);
        let response = await fetch(`/api/accounts/${userAuth.user_id}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access_token)
            }
        })
        let data = await response.json()
        
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
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div className='col-9 bg-secondary p-5'></div>
            </div>
        </div>
    )
}

export default UserPage
