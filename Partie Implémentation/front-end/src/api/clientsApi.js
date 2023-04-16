import axios from "axios";

const API_URL = "http://localhost:8080/";

export async function getClients() {
  try {
    const response = await axios.get(API_URL + "api/client");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}