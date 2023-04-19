import React from 'react'; 
import { useLocalState } from '../useLocalStorage';
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';

const JWT_VALIDATION_URL = "http://localhost:8080/api/"

const PrivateRoute = ({children}) => {
  //const [jwt, setJwt] = useLocalState("", "jwt");
  const jwt = localStorage.getItem("jwt");
  /*if (jwt) {
    const response = axios.get(JWT_VALIDATION_URL, {headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}}).then(response => {
      if (response === true){
        console.log("idk");
      }
    })
  }*/
  return (jwt !== "\"\"") ? children : <Navigate to="/login"/>
};

export default PrivateRoute; 