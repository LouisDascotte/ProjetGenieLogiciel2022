import React, { useState } from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../api/axios";


const PORTFOLIO_URL = "http://localhost:8080/api/portfolio/all";

const PortfoliosList = () => {
  
  // getting the jwt
  const jwt = localStorage.getItem("jwt");

  // creating the list of portfolios
  let portfolios = ["Portfolio 1", "Portfolio 2", "Portfolio 3"];

  // the name of the portfolio

  const getPortfolios = async () => {
    const response = axios.get(PORTFOLIO_URL, {
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
      console.log(response.data);
      //portfolios = response.data; 
    })
  }

  getPortfolios();

  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {portfolios.map(portfolio => <ListItem>
          <ListItemButton>
            <ListItemText>
              {portfolio}
            </ListItemText>
          </ListItemButton>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </ListItem> )}
      </List>
    </Box>
  )
}

export default PortfoliosList