export const emailValidator = email => {
  if (!email){
    return "ID is required"; 
  } /*else if (!new RegExp(/\S+@\S+\.\S+/).test(email)){
    return "Incorrect email format";
  }*/
  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Password is required";
  } else if (password.length <2){ // TO CHANGE TO 8 CHARS LATER
    return "Password must have a minimum of 8 characters";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword){
    return "Confirm password is required";
  } else if (confirmPassword !== form.password) {
    return "Password do not match";
  }
  return "";
};

export const nameValidator = name => {
  if (!name){
    return "Name is required"; 
  } else if (name.length < 2) {
    return "Enter a valid name";
  } else if (/[0-9]/.test(name)){
    return "Numbers are not allowed in the name";
  }
  return "";
}

export const phoneNumberValidator = phoneNumber =>{
  if (phoneNumber.length !== 9){
    return "Enter a valid phone number (02 xxx xx xx)";
  } else if (! /[0-9]/.test(phoneNumber)){
    return "Letters are not allowed in the phone number"
  }
  return "";
}

export const addressValidator = address => {
  if (! address){
    return "Address is required";
  } else if (!new RegExp(/(\d+)+\s+(\S+\s)+/).test(address)){
    return "enter a correct address"; // à vérifier au niveau de l'expression regex
  }
  return "";
}

export const cityValidator = city => {
  if (!city){
    return "A city is required";
  } else if (/[0-9]/.test(city)){
    return "Enter a correct city";
  }
  return "";
}

export const postalCodeValidator = postalCode => {
  if (!postalCode){
    return "A postal code is required";
  } else if (/[A-Za-z]/.test(postalCode)){
    return "Enter a correct postal code ";
  }

  return "";
}

