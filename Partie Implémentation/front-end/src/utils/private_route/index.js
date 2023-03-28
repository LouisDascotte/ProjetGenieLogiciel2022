import React from 'react'; 
import { useLocalState } from '../useLocalStorage';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  //const jwt = false; 
  return jwt ? children : <Navigate to="/login"/>
};

export default PrivateRoute; 