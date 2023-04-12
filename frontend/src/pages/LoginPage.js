import React, { useState } from 'react'
import { useLoginFormValidator } from '../components/loginForm/hooks/useLoginFormValidator';
import clsx from 'clsx'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateField = e => {
    const field = e.target.name;
    const nextFormState = {
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
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    alert(JSON.stringify(form, null, 2));
  };

  return (
    <div class="container" style={{marginTop:40+"px"}}> 
        <div class="row">
            <div class="col-8 offset-2 col-md-6 offset-md-3 text-center">
                <form className="loginForm mt-5" onSubmit={onSubmitForm}>
                    <h1>Sign In</h1>
                    <p>Don't have an account yet?</p>
                    <Link to="/accounts/register/">SIGN UP</Link>
                    <div className="formGroup text-start">
                        <label className="formLabel mt-3">Email</label>
                        <input
                        className={clsx(
                            "form-control form-control-dark",
                            errors.email.dirty && errors.email.error && "formFieldError"
                        )}
                        type="text"
                        aria-label="Email field"
                        name="email"
                        value={form.email}
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
                        value={form.password}
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
                    <Link to="/accounts/forgot/">FORGOT PASSWORD</Link>
                </form>
            </div>
        </div>
    </div>
  );
}

export default LoginPage
