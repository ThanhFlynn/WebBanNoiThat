export const usernameValidator = username => {
  if (!username) {
    return "Username is required";
  }
  return "";
};

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
    return "Password containing at least 8 characters, 1 number, 1 upper and 1 lowercase";
  }
  return "";
};

export const addressValidator = address => {
  if (!address) {
    return "Address is required";
  }
  return "";
};

export const telephoneValidator = telephone => {
  if (!telephone) {
    return "Telephone is required";
  } else if (!new RegExp(/((09|03|07|08|05)+([0-9]{8,9})\b)/g).test(telephone)) {
    return "Your phone number is not in the correct format!";
  }
  return "";
};