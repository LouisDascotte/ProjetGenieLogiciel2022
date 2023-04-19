import axios from "axios";


// Inspired by Permify
export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else 
  delete axios.defaults.headers.common["Authorization"];
}