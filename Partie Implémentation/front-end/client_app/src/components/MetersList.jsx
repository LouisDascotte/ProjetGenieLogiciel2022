import React, { useState, useEffect} from 'react'
import { Box,IconButton,  Stack, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import MeterConsumption from "../pages/MeterConsumption";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const URL = "http://localhost:8080/api/meter/all";


const MetersList = () => {
  const [meters, setMeters] =  useState([]);
  const [consumption, setConsumption] = useState(false);
  const [currentEan, setCurrentEan] = useState("");

  useEffect(()=> {
    // getting the jwt
    const jwt = localStorage.getItem("jwt");
    const client_id = localStorage.getItem("user");
  
    const response = axios.get(URL, {
    headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
    let temp_list = []
    setMeters(response.data)
    });
  }, [])
  
  /*meters.map(meter => {
    console.log(meter)
  })*/

  const navigate = useNavigate();

  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      
        
    <List style={{maxHeight: '100%', overflow: 'auto'}}>
    {meters.map(meter =>  
    <ListItem key={meter.ean}>
      <ListItemButton onClick={()=>navigate("/enter-consumption", {state : meter})}>
        <ListItemText>
          {meter.ean}
        </ListItemText>
      </ListItemButton>
      
    </ListItem>
    )}
  </List>
      
      
    </Box>
  )
}

export default MetersList