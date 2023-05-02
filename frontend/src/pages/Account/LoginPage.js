import React, { useState, useEffect } from 'react'
import { useLoginFormValidator } from '../../components/loginForm/hooks/useLoginFormValidator';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {

  let navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('info-user-token'))
      navigate("/");
  },[])

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);
  const [errorLogin, setErrorLogin] = useState("");
  const [show, setShow] = useState();
  const [errorRecover, setErrorRecover] = useState("");
  const [recoverEmail, setRecoverEmail] = useState({email: ''});

  function toggleShow() {
    setShow(!show);
  }

  const onUpdateField = e => {
    let field = e.target.name;
    let nextFormState = {
      ...form,
      [field]: e.target.value,
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
  };

  const onRecoverEmail = e =>{
    recoverEmail.email = e.target.value;
  };

  const onSubmitForm = e => {
    e.preventDefault();
    let { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    else{
      handleLogin();
    }
  };

  let handleLogin = async () =>{
    fetch(`/api/accounts/login/`,{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    })
    .then((response) => {
      if (!response.ok) {
        if(response.status === 400)
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        else if(response.status === 406)
          throw new Error(
              "Please confirm your email before login"
          );
        else if(response.status === 401)
          throw new Error(
              "Email or password is incorrect!"
          );
      }
      return response.json();
    })
    .then((actualData) => {
      sessionStorage.setItem("info-user-token",JSON.stringify(actualData));
      window.location.reload();
      navigate("/");
    })
    .catch((err) => {
        setErrorLogin(err.message);
    });
  }

  let handleRecover = async () =>{
    try {
      let response = await fetch(`/api/accounts/recoverPassword/`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recoverEmail),
      });

      let data = await response.json();

      if(response.status === 200){
        setErrorRecover(data.message);
      }else if(response.status === 400){
        setErrorRecover(data.error_message);
      }
    } catch (error) {
      setErrorRecover("Lỗi kết nối! Vui lòng thử lại sau");
    }
  }

  const onRecoverForm = e =>{
    e.preventDefault();
    handleRecover();
  }

  return (
    <div class="container" style={{marginTop:40+"px"}}> 
        <div class="row">
          <div class="col-8 offset-2 col-md-6 offset-md-3 text-center">
            {!show ? (
            <form className="loginForm mt-5" onSubmit={onSubmitForm}>
                <h1>Đăng nhập</h1>
                <p>Chưa có tài khoản?</p>
                <Link to="/accounts/register/">Đăng ký</Link>
                {errorLogin ? (
                  <p className="formFieldErrorMessage">{errorLogin}</p>
                ) : null}
                <div className="formGroup text-start">
                    <label htmlFor='email' className="formLabel mt-3">Email</label>
                    <input
                    className={clsx(
                        "form-control form-control-dark",
                        errors.email.dirty && errors.email.error && "formFieldError"
                    )}
                    type="email"
                    aria-label="Email field"
                    name="email"
                    id='email'
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                    />
                    {errors.email.dirty && errors.email.error ? (
                    <p className="formFieldErrorMessage">{errors.email.message}</p>
                    ) : null}
                </div>
                <div className="formGroup text-start">
                    <label className="formLabel mt-3">Password</label>
                    <input
                      className={clsx(
                          "form-control form-control-dark",
                          errors.password.dirty && errors.password.error && "formFieldError"
                      )}
                      type="password"
                      aria-label="Password field"
                      name="password"
                      id='password'
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                    />
                    {errors.password.dirty && errors.password.error ? (
                    <p className="formFieldErrorMessage">
                      {errors.password.message}
                    </p>
                    ) : null}
                </div>
                <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Đăng nhập"/>
                <Link to='#' onClick={toggleShow}>Quên mật khẩu</Link>
            </form>
            ) : (
            <form className='recoverForm mt-5' onSubmit={onRecoverForm}>
              <h1>Reset Password</h1>
              <p>Vui lòng nhập địa chỉ email của bạn dưới đây. Bạn sẽ nhận được một liên kết để thiết lập lại mật khẩu của bạn.</p>   
              {errorRecover ? (
                  <p className="formFieldErrorMessage">{errorRecover}</p>
                ) : null}
              <div className="formGroup text-start">
                <label htmlFor='recoveremail' className="formLabel mt-3">Email:</label>
                <input
                  className="form-control form-control-dark"
                  type="email"
                  name="recoveremail"
                  id='recoveremail'
                  onChange={onRecoverEmail}
                />
              </div>
              <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Submit"/>
              <Link to='#' onClick={toggleShow}>Cancel</Link>
            </form>
            )}
          </div>
        </div>
    </div>
  );
}

export default LoginPage
