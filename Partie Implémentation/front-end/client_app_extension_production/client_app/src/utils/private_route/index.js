import React from 'react'; 
import { useLocalState } from '../useLocalStorage';
import { Navigate } from 'react-router-dom';
import axios from '../../api/axios';

const JWT_VALIDATION_URL = "http://localhost:8080/api/"

const PrivateRoute = ({children}) => {
  //const [jwt, setJwt] = useLocalState("", "jwt");
  let jwt = localStorage.getItem("jwt");
  let auth = localStorage.getItem("authenticated");
  if (jwt === null) {
    jwt = "null";
  }

  React.useEffect(()=>{
    if(auth === false || auth === null){
      const response = axios.get(JWT_VALIDATION_URL + "auth/expired_token", {
        headers : {
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin":true,
        }, params : {
          token : jwt
        }
      }).then(response => {
        if(response.status === 200 && response.data === false){
          localStorage.setItem("authenticated", true)
          auth = true; 
        } else if (response.status === 200 && response.data === true){
          localStorage.setItem("authenticated", false);
          auth = false; 
        }
      }).catch(err=>{
        console.log(err.response.data);
        localStorage.setItem("authenticated", false)
        auth = false; 
      })
    }
  })
  return auth ? children : <Navigate to="/login"/>
};

export default PrivateRoute; 