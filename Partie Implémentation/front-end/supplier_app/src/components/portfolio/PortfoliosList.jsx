import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import Portfolio from './Portfolio';


const PORTFOLIO_URL = "http://localhost:8080/api/portfolio/all";



 

const PortfoliosList = () => {
  const  navigate = useNavigate();
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


  const [selectedId, setSelectedId] = useState("");

  const [childPortfolio, setChildPortfolio] = useState();

  const handleClick = (id) => {
    portfolios.map(portfolio => {
      if (portfolio.id === id){
        setChildPortfolio(portfolio);
      }
    })
    setSelectedId(id);
  }

  function selectById(id){
    portfolios.map(portfolio => {
      if (portfolio.id === id){
        setChildPortfolio(portfolio);
      }
    })
  }
  
  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      {selectedId === "" ? <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {portfolios.map(portfolio =>  
        <ListItem>
          <ListItemButton onClick={()=>handleClick(portfolio.id)}>
            <ListItemText>
              {portfolio.name}
            </ListItemText>
          </ListItemButton>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </ListItem>
        )}
      </List> : <Portfolio data={{childPortfolio}}/>}
    </Box>
  )
}

export default PortfoliosList