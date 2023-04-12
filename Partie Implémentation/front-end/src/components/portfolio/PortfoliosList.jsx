import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../../api/axios";


const PORTFOLIO_URL = "http://localhost:8080/api/portfolio/all";



 

const PortfoliosList = () => {
  const [portfolios, setPortfolios] =  useState([]);
  useEffect(()=> {
    // getting the jwt
    const jwt = localStorage.getItem("jwt");
  
    const response = axios.get(PORTFOLIO_URL, {
    headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
    setPortfolios(response.data);
    });
  }, [])
  
  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {portfolios.map(portfolio =>  
        <ListItem>
          <ListItemButton>
            <ListItemText>
              {portfolio.name}
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

export default PortfoliosList