import React, { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu';
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ArrowBack} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import axios from 'axios';


const ContractsRequests = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9bcc6c",
        contrastText: '#fff'
      }, 
      secondary: {
        main: "#000",
        contrastText: '#000000'
      }
    }
  });

  const nav = useNavigate();

  const [contracts, setContracts] = React.useState([]);

  useEffect(() => {
    async function getContracts() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get("http://localhost:8080/api/contract/all", config);
        const actCont =response.data.filter((contract) => contract.status === "PENDING")
        setContracts(actCont);
      } catch (error) {
        console.log(error);
      }
    }
    getContracts();
  }, []);

  const pageAddress = "/contracts/requests";
  const pageName = "Manage Contract Requests";

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'auto'}}>
              <Box sx={{height:'100%', width:'100%'}} alignment='center' > 
                <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                  Contract Requests
                </Typography>
                <List style={{maxHeight: '100%', overflow: 'auto'}} >
                  {contracts.map((contractRequest) => (
                    <ListItem key={contractRequest.id}>
                      <ListItemText primary={`${contractRequest.id}`} />
                        <Button variant="contained" onClick={() => nav(`/contracts/requests/${contractRequest.id}`, { state : contractRequest})} >
                          See Details
                        </Button>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Card> 
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ContractsRequests