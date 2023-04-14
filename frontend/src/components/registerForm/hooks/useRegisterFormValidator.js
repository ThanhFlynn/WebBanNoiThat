import { useState } from "react";

import {
  usernameValidator,
  emailValidator,
  passwordValidator,
  addressValidator,
  telephoneValidator
} from "../validators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useRegisterFormValidator = form => {
  const [errors, setErrors] = useState({
    username: {
      dirty: false,
      error: false,
      message: "",
    },
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    address: {
      dirty: false,
      error: false,
      message: "",
    },
    telephone: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { username, email, password, address, telephone } = form;

    if (nextErrors.username.dirty && (field ? field === "username" : true)) {
      let usernameMessage = usernameValidator(username, form);
      nextErrors.username.error = !!usernameMessage;
      nextErrors.username.message = usernameMessage;
      if (!!usernameMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      let emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      let passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (nextErrors.address.dirty && (field ? field === "address" : true)) {
      let addressMessage = addressValidator(address, form);
      nextErrors.address.error = !!addressMessage;
      nextErrors.address.message = addressMessage;
      if (!!addressMessage) isValid = false;
    }

    if (nextErrors.telephone.dirty && (field ? field === "telephone" : true)) {
      let telephoneMessage = telephoneValidator(telephone, form);
      nextErrors.telephone.error = !!telephoneMessage;
      nextErrors.telephone.message = telephoneMessage;
      if (!!telephoneMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    let field = e.target.name;
    let fieldError = errors[field];
    if (fieldError.dirty) return;

    let updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};