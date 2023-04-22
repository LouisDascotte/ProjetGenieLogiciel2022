import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../api/axios";
import {useNavigate} from 'react-router-dom';


const URL = "http://localhost:8080/api/contract/all";


const ContractsList = () => {
  const [contracts, setContracts] =  useState([]);
  const navigate = useNavigate();
  useEffect(()=> {
    // getting the jwt
    const jwt = localStorage.getItem("jwt");
  
    const response = axios.get(URL, {
    headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
    setContracts(response.data);
    });
  }, [])
  
  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {contracts.map(contract =>  
        <ListItem>
          <ListItemButton onClick={()=> navigate(`/view-contract`, {state : contract})}>
            <ListItemText>
              {contract.id}
            </ListItemText>
          </ListItemButton>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </ListItem>
)}
      </List>
    </Box>
  )
}

export default ContractsList