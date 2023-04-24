const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
  localStorage.removeItem("authenticated");
  localStorage.removeItem("client_email");
  localStorage.removeItem("lastName");
}

const authServices = {
  getUser, 
  logout,
};

export default authServices;