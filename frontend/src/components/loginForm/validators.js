export const emailValidator = email => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Password is required";
  } else if (!new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/).test(password)) {
    return "Password containing at least 8 characters, 1 number, 1 special character";
  }
  return "";
};