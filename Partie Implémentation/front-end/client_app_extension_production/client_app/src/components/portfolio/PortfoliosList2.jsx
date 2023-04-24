import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import Portfolio from './Portfolio';


const PORTFOLIO_URL = "http://localhost:8080/api/portfolio";

const PortfoliosList2 = () => {
  const  navigate = useNavigate();
  const [portfolios, setPortfolios] =  useState([]);
  const jwt = localStorage.getItem("jwt");
  const [state, setState] = useState(0);
  useEffect(()=> {
    const jwt = localStorage.getItem("jwt");
    // getting the jwt  
    const response = axios.get(PORTFOLIO_URL + "/all", {
    headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
    setPortfolios(response.data);
    });
  }, [])

  function reload(){
    const jwt = localStorage.getItem("jwt");
    // getting the jwt  
    const response = axios.get(PORTFOLIO_URL + "/all", {
    headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
    setPortfolios(response.data);
    setState(state + 1);
    
    });
  }

  const handleClick = (id) => {
    navigate("/portfolio/" + id)
  }


  const handleDelete = (id) => {
    const response = axios.delete(PORTFOLIO_URL + `/${id}`,{
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        console.log(response.data);
      })
    reload();
    window.location.reload();

  } 

  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {portfolios.map(portfolio =>  
        <ListItem>
          <ListItemButton onClick={()=>handleClick(portfolio.id)}>
            <ListItemText>
              {portfolio.name}
            </ListItemText>
          </ListItemButton>
          <IconButton onClick={()=>handleDelete(portfolio.id)}>
            <DeleteIcon/>
          </IconButton>
        </ListItem>
        )}
      </List>
    </Box>
  )
}

export default PortfoliosList2