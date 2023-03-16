import {useState} from "react"; 

import { emailValidator, passwordValidator, confirmPasswordValidator, nameValidator, addressValidator, cityValidator, postalCodeValidator, phoneNumberValidator } from "../../utils/validators";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useRegisterFieldValidator = form => {
  const [errors, setErrors] = useState({
    firstName:{
      dirty: false, 
      error: false, 
      message: ""
    },
    lastName:{
      dirty: false, 
      error: false, 
      message: ""
    },
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    phoneNumber:{
      dirty: false, 
      error: false, 
      message: ""
    },
    address:{
      dirty: false, 
      error: false, 
      message: ""
    },
    city:{
      dirty: false, 
      error: false, 
      message: ""
    },
    country:{
      dirty: false, 
      error: false, 
      message: ""
    },
    postalCode:{
      dirty: false, 
      error: false, 
      message: ""
    },
    language:{
      dirty: false, 
      error: false, 
      message: ""
    },
    
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false}) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));
    console.log(errors);

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const {firstName, lastName, email, phoneNumber, address, city, country, postalCode, language, password, confirmPassword } = form;
 
    if (nextErrors.firstName.dirty && (field ? field === "firstName" : true)) {
      const firstNameMessage = nameValidator(firstName);
      nextErrors.firstName.error = !!firstNameMessage;
      nextErrors.firstName.message = firstNameMessage;
      if (!!firstNameMessage) isValid = false;
    }

    if (nextErrors.lastName.dirty && (field ? field === "lastName" : true)) {
      const lastNameMessage = nameValidator(lastName);
      nextErrors.lastName.error = !! lastNameMessage;
      nextErrors.lastName.message = lastNameMessage;
      if (!!lastNameMessage) isValid = false;
    }

    if (nextErrors.language.dirty && (field ? field === "language" : true)) {
      const languageMessage = nameValidator(language);
      nextErrors.language.error = !! languageMessage;
      nextErrors.language.message = languageMessage;
      if (!!languageMessage) isValid = false;
    }

    if (nextErrors.firstName.dirty && (field ? field === "phoneNumber" : true)) {
      const phoneNumberMessage = phoneNumberValidator(phoneNumber);
      nextErrors.phoneNumber.error = !! phoneNumberMessage;
      nextErrors.phoneNumber.message = phoneNumberMessage;
      if (!!phoneNumberMessage) isValid = false;
    }

    if (nextErrors.firstName.dirty && (field ? field === "address" : true)) {
      const addressMessage = addressValidator(address);
      nextErrors.address.error = !! addressMessage;
      nextErrors.address.message = addressMessage;
      if (!!addressMessage) isValid = false;
    }

    if (nextErrors.city.dirty && (field ? field === "city" : true)) {
      const cityMessage = cityValidator(city);
      nextErrors.city.error = !! cityMessage;
      nextErrors.city.message = cityMessage;
      if (!!cityMessage) isValid = false;
    }

    if (nextErrors.country.dirty && (field ? field === "country" : true)) {
      const countryMessage = cityValidator(country);
      nextErrors.country.error = !! countryMessage;
      nextErrors.country.message = countryMessage;
      if (!!countryMessage) isValid = false;
    }

    if (nextErrors.postalCode.dirty && (field ? field === "postalCode" : true)) {
      const postalCodeMessage = postalCodeValidator(postalCode);
      nextErrors.postalCode.error = !! postalCodeMessage;
      nextErrors.postalCode.message = postalCodeMessage;
      if (!!postalCodeMessage) isValid = false;
    }


    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (nextErrors.confirmPassword.dirty && (field ? field === "confirmPassword" : true)) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

    
    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
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