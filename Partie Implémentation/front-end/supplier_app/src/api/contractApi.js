import axios from "axios";

const API_URL = "http://localhost:8080/";

export  function getContracts() {
  try {
    const response = axios.get(API_URL + "api/contract/all");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}