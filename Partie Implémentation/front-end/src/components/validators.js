export const emailValidator = email => {
  if (!email){
    return "Email is required"; 
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)){
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = password => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8){
    return "Password must have a minimum of 8 characters";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword){
    return "Confirm password is required";
  } else if (confirmPassword != form.password) {
    return "Password do not match";
  }
  return "";
};