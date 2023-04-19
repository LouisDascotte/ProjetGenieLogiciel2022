const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("jwt");
}

const authServices = {
  getUser, 
  logout,
};

export default authServices;