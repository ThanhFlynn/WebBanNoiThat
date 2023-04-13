import React, { useState, useEffect } from 'react'
import { useLoginFormValidator } from '../../components/loginForm/hooks/useLoginFormValidator';
import clsx from 'clsx'
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
  const [errorRegister, setErrorRegister] = useState("");

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
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
      }
      return response.json();
    })
    .then((actualData) => {
      sessionStorage.setItem("info-user-token",JSON.stringify(actualData));
      console.log(actualData);
      window.location.reload();
      navigate("/");
    })
    .catch((err) => {
        console.log(err.message);
        setErrorRegister("Email or password is incorrect!");
    });
  }

  return (
    <div class="container" style={{marginTop:40+"px"}}> 
        <div class="row">
          <div class="col-8 offset-2 col-md-6 offset-md-3 text-center">
            <form className="loginForm mt-5" onSubmit={onSubmitForm}>
                <h1>Sign Up</h1>
                {errorRegister ? (
                  <p className="formFieldErrorMessage">{errorRegister}</p>
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
                <input className="formSubmitBtn bg-success text-white mt-4 mb-3" type="submit" value="Sign In"/>
                <p>Already have an account?</p>
                <Link to="/accounts/login/">SIGN IN</Link>
            </form>
          </div>
        </div>
    </div>
  );
}

export default LoginPage
