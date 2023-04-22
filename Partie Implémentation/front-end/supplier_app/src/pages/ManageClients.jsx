import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu'
import {ArrowBack} from '@mui/icons-material'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients } from '../resources/Lists';
import axios from '../api/axios';

const ManageClients = () => {

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

  const API_URL = "http://localhost:8080/api/supplier/clients";

  const pageAddress = "/client";
  const pageName = "Manage clients";

  const [clients, setClients] = React.useState([]);

  useEffect(() => {
    async function getClients() {
      try {        
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: { Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get(API_URL, config);
        console.log("Hello");
        console.log(response.data);
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  }, []);


  const handleClientClick = (clientID) => {
    console.log(clientID);
  };

  

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'60%' }} >
              <Box sx={{height:'100%', width:'100%'}} alignment='center' >
                <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                  Client List
                </Typography>
                <List style={{maxHeight: '100%', overflow: 'auto'}} >
              {Clients.map((client) => (
                <ListItem key={client.clientId}>
                  <ListItemText primary={`${client.name}`} />
                  <Link to={`/clients/${client.clientId}`}>
                    <Button variant="contained" onClick={() => handleClientClick(client.clientId)} >
                      See Details
                    </Button>
                  </Link>
                </ListItem>
              ))}
            </List>
              </Box>
            </Card>
            <Link to='/clients/new' className='link-3' style={{display: 'inline-block', mt:2, width:'50%', mb:5}}>
              <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                Add New Client
              </Button>
            </Link>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );

}

export default ManageClients