import React, { useState, useEffect } from 'react'
import { useRegisterFormValidator } from '../../components/registerForm/hooks/useRegisterFormValidator'; 
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('info-user-token'))
      navigate("/");
  },[])

  const [form, setForm] = useState({
    username:"",
    email: "",
    password: "",
    address:"",
    telephone:"",
  });
  
  const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);
  const [errorRegister, setErrorRegister] = useState("");
  const [isRegister, setIsRegister] = useState(false);

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

  const onSubmitForm = e => {
    e.preventDefault();
    let { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    else{
      console.log(JSON.stringify(form,null,2));
      handleRegister();
    }
  };

  let handleRegister = async () =>{
    let response = await fetch(`/api/accounts/register/`,{
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
    })

    let data = await response.json()

    if(response.status === 201){
      setIsRegister(true);
    }else if(response.status === 400){
      setErrorRegister(data.error_message);
    }
  }

  return (
    <div class="container" style={{marginTop:120+"px"}}> 
        <div class="row">
          <div class="col-8 offset-2 col-md-6 offset-md-3 text-center">
            {isRegister === false ? (
            <form className="registerForm mt-1 mb-4" onSubmit={onSubmitForm}>
                <h1>Đăng ký</h1>
                {errorRegister !== null ? (
                  <p className="formFieldErrorMessage">{errorRegister}</p>
                ) : null}
                <div className="formGroup text-start">
                    <label htmlFor='username' className="formLabel mt-3">Tên đăng nhập :</label>
                    <input
                    className={clsx(
                        "form-control form-control-dark",
                        errors.username.dirty && errors.username.error && "formFieldError"
                    )}
                    type="text"
                    aria-label="Username field"
                    name="username"
                    id='username'
                    onChange={onUpdateField}
                    onBlur={onBlurField}
                    />
                    {errors.username.dirty && errors.username.error ? (
                    <p className="formFieldErrorMessage">{errors.username.message}</p>
                    ) : null}
                </div>
                <div className="formGroup text-start">
                    <label htmlFor='email' className="formLabel mt-3">Email :</label>
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
                    <label htmlFor='password' className="formLabel mt-3">Password :</label>
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
                <div className="formGroup text-start">
                    <label htmlFor='address' className="formLabel mt-3">Địa chỉ :</label>
                    <input
                      className={clsx(
                          "form-control form-control-dark",
                          errors.address.dirty && errors.address.error && "formFieldError"
                      )}
                      type="text"
                      aria-label="Address field"
                      name="address"
                      id='address'
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                    />
                    {errors.address.dirty && errors.address.error ? (
                    <p className="formFieldErrorMessage">
                      {errors.address.message}
                    </p>
                    ) : null}
                </div>
                <div className="formGroup text-start">
                    <label htmlFor='telephone' className="formLabel mt-3">Số điện thoại :</label>
                    <input
                      className={clsx(
                          "form-control form-control-dark",
                          errors.telephone.dirty && errors.telephone.error && "formFieldError"
                      )}
                      type="text"
                      aria-label="Telephone field"
                      name="telephone"
                      id='telephone'
                      onChange={onUpdateField}
                      onBlur={onBlurField}
                    />
                    {errors.telephone.dirty && errors.telephone.error ? (
                    <p className="formFieldErrorMessage">
                      {errors.telephone.message}
                    </p>
                    ) : null}
                </div>
                <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Tạo"/>
                <p>Already have an account?</p>
                <Link to="/accounts/login/">SIGN IN</Link>
            </form>
            ) : (
              <div className='fst-italic' style={{marginTop:100+"px"}}>
                <h1>Register successful!</h1>
                <Link to="/accounts/login/" className='text-decoration-underline'>SIGN IN</Link>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}

export default RegisterPage
