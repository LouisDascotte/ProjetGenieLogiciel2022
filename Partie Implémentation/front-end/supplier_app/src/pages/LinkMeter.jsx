import React from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useLocation} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';
import axios from '../api/axios';

function LinkMeter() {
  const client = useLocation().state;
  const [newMeterID, setNewMeterID] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#9bcc6c",
        contrastText: '#fff'
      }, 
      secondary: {
        main: "#000",
        contrastText: '#000000'
      },
      error: {
        main: "#f00",
        contrastText : '#000000'
      }
    }
  });

  const pageAddress = "/clients/:id/link-meter";
  const pageName = "Link meter to client";

  function getClientName() {
    return client.name;
  }
  async function handleConfirmLink() {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.put(`http://localhost:8080/api/meter/${newMeterID}/link`, null, {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
          params: {clientId: client.id}
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
  }

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Grid container
            justifyContent='center'
            alignItems='center'
            >
              <Grid item xs={12} >
                <Typography variant='h5' sx={{mt:2, mb:2}}>
                  Client: {getClientName()} #{client.id}
                </Typography>
              </Grid>
              <Grid item xs={3} >
                <Typography variant='h6' sx={{mt:2, mb:2}}>
                  Meter ID:
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="meterId"
                  label="Meter ID"
                  variant="outlined"
                  type='number'
                  sx={{mt:2, mb:2, width:'auto'}}
                  onChange={(e) => setNewMeterID(e.target.value)}
                />
              </Grid>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={12} >
                <Button variant='outlined' disabled={newMeterID.length === 18 ? false : true}  color='secondary' onClick={handleConfirmLink} sx={{mt:2, width:'30%', mb:5}}>
                    Confirm Link
                  </Button>
              </Grid>
              <Grid item xs={12} >
                <Link to={`/clients/${client.id}`} style={{ textDecoration: 'none' }}>
                  <Button variant='outlined' color='error' sx={{mt:2, width:'auto', mb:5}}>
                      Cancel
                  </Button>
                </Link>          
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default LinkMeter;