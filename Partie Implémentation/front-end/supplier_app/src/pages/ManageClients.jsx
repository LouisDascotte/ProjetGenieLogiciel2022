import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu'
import {ArrowBack} from '@mui/icons-material'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';

const ManageClients = () => {

  const {t} = useTranslation();

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

  const API_URL = "http://localhost:8080/api/supplier/clients";

  const pageAddress = "/client";
  const pageName = "Manage clients";

  const [clients, setClients] = React.useState([]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    async function getClients() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: { "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get(API_URL, config);
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getClients();
  }, []);

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'60%' }} >
              <Box sx={{height:'auto', width:'100%'}} alignment='center' marginBottom={4} paddingBottom={4}>
                <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                  t('Client List')
                </Typography>
                <List style={{maxHeight: '100%', overflow: 'auto'}} >
                  {clients.length === 0 ?
                  <ListItem>
                    <ListItemText primary="No clients found" />
                  </ListItem>
                  :
                  clients.map((client) => (
                    <ListItem key={client.id}>
                    <ListItemText primary={capitalizeFirstLetter(client.firstName)+" "+capitalizeFirstLetter(client.lastName)} />
                      <Button variant="contained" onClick={() => nav(`/clients/${client.id}`, { state : client })} >
                        t('See Details')
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

export default ManageClients