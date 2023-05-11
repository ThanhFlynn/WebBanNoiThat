import React, {useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom';

const RecoverPasswordPage = () => {
    let navigate = useNavigate();
    let { sid }= useParams();
    const [form, setForm] = useState({
        password: "",
        confirmpassword: "",
    });

    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

    const checkPW = e =>{
        let field = e.target.name;
        let nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
    }

    const onRecoverPassword = e =>{
        e.preventDefault();
        if (!form.password) {
            setErrorPassword("Password is required");
        } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(form.password)) {
            setErrorPassword("Password containing at least 8 characters, 1 number, 1 special character");
        } else setErrorPassword("");
        if (!form.confirmpassword) {
            setErrorConfirmPassword("Confirm password is required");
        } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(form.confirmpassword)) {
            setErrorConfirmPassword("Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase");
        } else if (form.confirmpassword !== form.password) {
            setErrorConfirmPassword("Passwords do not match");
        } else setErrorConfirmPassword("");
        if(errorPassword === "" && errorConfirmPassword === ""){
            handleRecover();
        }
    }

    let handleRecover = async () =>{
      try {
        let response = await fetch(`/api/accounts/doRecoverPassword?${sid}`,{
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(form),
        });

        let data = await response.json();

        if(response.status === 200){
          alert(data.message);
          navigate("/accounts/login/");
        }
        
      } catch (error) {
        console.log(error);
      }
  }

    return (
        <div className="container" style={{marginTop:40+"px"}}> 
        <div className="row">
          <div className="col-8 offset-2 col-md-6 offset-md-3 text-center">
            <form className='recoverForm mt-5' onSubmit={onRecoverPassword}>
              <h1>Điền mật khẩu mới</h1>
              <div className="formGroup text-start">
                <label htmlFor='password' className="formLabel mt-3">Mật khẩu mới:</label>
                <input 
                    className=
                          "form-control form-control-dark"
                    type="password"
                    name="password"
                    id='password'
                    onChange={checkPW}
                />
                {errorPassword ? (
                    <p className="formFieldErrorMessage">
                      {errorPassword}
                    </p>
                ) : null}
              </div>
              <div className="formGroup text-start">
                    <label htmlFor='confirmpassword' className="formLabel mt-3">Xác nhận mật khẩu mới:</label>
                    <input
                    className="form-control form-control-dark"
                    type="password"
                    name="confirmpassword"
                    id='confirmpassword'
                    onChange={checkPW}
                    />
                    {errorConfirmPassword ? (
                    <p className="formFieldErrorMessage">
                      {errorConfirmPassword}
                    </p>
                ) : null}
              </div>
              <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Gửi"/>
            </form>
          </div>
        </div>
    </div>
    )
}

export default RecoverPasswordPage
