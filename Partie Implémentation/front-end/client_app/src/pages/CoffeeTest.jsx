import React from 'react';
import axios from 'axios';

const CoffeeTest = () => {

  const axios_config = {
    headers:{
      
    }
  }
  axios.get("http://localhost:8080/api/client/testing", axios_config).then(response => console.log(response)).catch(error=>console.log(error));

  return (
    <div>CoffeeTest</div>
  )
}

export default CoffeeTest