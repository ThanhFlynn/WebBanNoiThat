import React, {useState} from 'react'

const ChangePassword = ({authTokens}) => {

    const [form, setForm] = useState({
        oldpassword:"",
        newpassword:"",
        confirmnewpassword:"",
    });
    const [checkStatus,setCheckStatus] = useState("");
    const [errorPassword,setErrorPassword] = useState("");
    const [errorNewPassword,setErrorNewPassword] = useState("");
    const [errorConfirmNewPassword,setErrorConfirmNewPassword] = useState("");

    const onChangePW = e =>{
        e.preventDefault();
        if (!form.oldpassword) {
            setErrorPassword("Old password is required");
        } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(form.oldpassword)) {
            setErrorPassword("Password containing at least 8 characters, 1 number, 1 special character");
        } else setErrorPassword("");
        if (!form.newpassword) {
            setErrorNewPassword("New password is required");
        } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(form.newpassword)) {
            setErrorNewPassword("Password containing at least 8 characters, 1 number, 1 special character");
        } else setErrorNewPassword("");
        if (!form.confirmnewpassword) {
            setErrorConfirmNewPassword("Confirm password is required");
        } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(form.confirmnewpassword)) {
            setErrorConfirmNewPassword("Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase");
        } else if (form.confirmnewpassword !== form.newpassword) {
            setErrorConfirmNewPassword("Passwords do not match");
        } else setErrorConfirmNewPassword("");
        if(errorPassword == "" && errorNewPassword == "" && errorConfirmNewPassword == "")
            handleChangePassword();
    }

    let handleChangePassword = async() =>{
        let response = await fetch('/api/accounts/changePW/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(authTokens.access_token)
            },
            body: JSON.stringify(form),
        })

        if(response.status === 200)
            setCheckStatus("Thay đổi mật khẩu thành công!");
        else if(response.status === 400)
            setCheckStatus("Mật khẩu cũ không chính xác!");
    }

    return (
        <div class="container"> 
            <div class="row">
                <div class="col-8 offset-2 col-md-6 offset-md-3 text-center">
                    <form className="registerForm mt-1 mb-4" onSubmit={onChangePW}>
                        <h1>Thay đổi mật khẩu</h1>
                        {checkStatus ? (
                        <p className="formFieldErrorMessage">{checkStatus}</p>
                        ) : null}
                        <div className="formGroup text-start">
                            <label htmlFor='oldpassword' className="formLabel mt-3">Mật khẩu cũ :</label>
                            <input
                                className="form-control form-control-dark"
                                type="password"
                                name="oldpassword"
                                id='oldpassword'
                                onChange={(e) => {setForm({...form, 'oldpassword':e.target.value})}}
                            />
                            {errorPassword ? (
                                <p className="formFieldErrorMessage">{errorPassword}</p>
                            ) : null}
                        </div>
                        <div className="formGroup text-start">
                            <label htmlFor='newpassword' className="formLabel mt-3">Mật khẩu mới :</label>
                            <input
                                className="form-control form-control-dark"
                                type="password"
                                name="newpassword"
                                id='newpassword'
                                onChange={(e) => {setForm({...form, 'newpassword':e.target.value})}}
                            />
                            {errorNewPassword ? (
                                <p className="formFieldErrorMessage">{errorNewPassword}</p>
                            ) : null}
                        </div>
                        <div className="formGroup text-start">
                            <label htmlFor='confirmnewpassword' className="formLabel mt-3">Xác nhận mật khẩu mới :</label>
                            <input
                                className="form-control form-control-dark"
                                type="password"
                                name="confirmnewpassword"
                                id='confirmnewpassword'
                                onChange={(e) => {setForm({...form, 'confirmnewpassword':e.target.value})}}
                            />
                            {errorConfirmNewPassword ? (
                                <p className="formFieldErrorMessage">{errorConfirmNewPassword}</p>
                            ) : null}
                        </div>
                        <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Thay đổi"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
