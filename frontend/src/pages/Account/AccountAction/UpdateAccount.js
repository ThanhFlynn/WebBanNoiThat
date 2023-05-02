import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';

const UpdateAccount = ({user,authTokens}) => {

    let navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        address: "",
        telephone: "",
    });
    const [checkStatus,setCheckStatus] = useState("");

    const onUpdateAccount = e =>{
        e.preventDefault();
        if(form.username == "")
            form.username = user.username;
        if(form.email == "")
            form.email = user.email;
        if(form.address == "")
            form.address = user.address;
        if(form.telephone == "")
            form.telephone = user.telephone;
        user.username = form.username;
        user.email = form.email;
        user.address = form.address;
        user.telephone = form.telephone;
        updateAccount();
    }

    let updateAccount = async() =>{
        let response = await fetch('/api/accounts/detail/', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(authTokens.access_token)
            },
            body: JSON.stringify(user),
        })

        if(response.status === 200){
            setCheckStatus("Account update successful");
        }

        else if(response.status === 401){
            alert("Hết phiên đăng nhập. Vui lòng đăng nhập lại!");
            sessionStorage.removeItem("info-user-token");
            navigate("/accounts/login/");
        }
        else if(response.status === 400){
            setCheckStatus("Something wrong!");
        }

    }

    return (
        <div class="container"> 
            <div class="row">
                <div class="col-8 offset-2 col-md-6 offset-md-3 text-center">
                    <form className="registerForm mt-1 mb-4" onSubmit={onUpdateAccount}>
                        <h1>Cập nhật tài khoản</h1>
                        {checkStatus !== null ? (
                        <p className="formFieldErrorMessage">{checkStatus}</p>
                        ) : null}
                        <div className="formGroup text-start">
                            <label htmlFor='username' className="formLabel mt-3">Tên đăng nhập :</label>
                            <input
                                className= "form-control form-control-dark"
                                type="text"
                                aria-label="username field"
                                name="username"
                                id='username'
                                onChange={(e) => {setForm({...form, 'username':e.target.value})}}
                                defaultValue={user.username}
                            />
                        </div>
                        <div className="formGroup text-start">
                            <label htmlFor='email' className="formLabel mt-3">Email :</label>
                            <input
                                className="form-control form-control-dark"
                                type="email"
                                aria-label="Email field"
                                name="email"
                                id='email'
                                defaultValue={user.email}
                                disabled readonly
                                onChange={(e) => {setForm({...form, 'email':e.target.value})}}
                            />
                        </div>
                        <div className="formGroup text-start">
                            <label htmlFor='address' className="formLabel mt-3">Địa chỉ :</label>
                            <input
                                className="form-control form-control-dark"
                                type="text"
                                aria-label="Address field"
                                name="address"
                                id='address'
                                defaultValue={user.address}
                                onChange={(e) => {setForm({...form, 'address':e.target.value})}}
                            />
                        </div>
                        <div className="formGroup text-start">
                            <label htmlFor='telephone' className="formLabel mt-3">Số điện thoại :</label>
                            <input
                                className="form-control form-control-dark"
                                type="text"
                                aria-label="Telephone field"
                                name="telephone"
                                id='telephone'
                                defaultValue={user.telephone}
                                onChange={(e) => {setForm({...form, 'telephone':e.target.value})}}
                            />
                        </div>
                        <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Cập nhật"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateAccount
