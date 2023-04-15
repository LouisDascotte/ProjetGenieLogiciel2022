import React from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';

function LinkMeter() {
  const id = useParams().id;
  const [newMeterID, setNewMeterID] = React.useState(null);
  const [beginDate, setBeginDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);

  useEffect(() => {
    if (newMeterID && beginDate && endDate) {
      setDisabled(false);
      } else {
        setDisabled(true);
        }
        }, [newMeterID, beginDate, endDate]);

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

  const getClientById = (id) => {
    const idInt = parseInt(id,10);
    return Clients.find((client) => client.clientId === idInt);
  };
  const client = getClientById(id);

  function getClientName() {
    return client.name;
  }
  const handleConfirmLink = () => {
    alert(`POST Meter (${newMeterID}) linked to client ${getClientName()}, ${id}`);
  };

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
                  Client: {getClientName()} #{id}
                </Typography>
              </Grid>
              <Grid item xs={3} >
                <Typography variant='h6' sx={{mt:2, mb:2}}>
                  Begin date: 
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="beginDate"
                  value={beginDate}
                  onChange={(e) => setBeginDate(e.target.value)}
                  variant="outlined"
                  sx={{mt:2, mb:2, width:'40%'}}
                  type='date'
                />
              </Grid>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={3} justifyContent='end' >
                <Typography variant='h6' sx={{mt:2, mb:2}} >
                  End date:
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <TextField
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  variant="outlined"
                  sx={{mt:2, mb:2, width:'40%'}}
                  type='date'
                />
              </Grid>
              <Grid item xs={3} >
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
                  sx={{mt:2, mb:2, width:'40%'}}
                  type='number'
                  onChange={(e) => setNewMeterID(e.target.value)}
                />
              </Grid>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={12} >
                <Link to={`/clients/${id}`} style={{ textDecoration: 'none' }}>
                  <Button variant='outlined' disabled={disabled}  color='secondary' onClick={handleConfirmLink} sx={{mt:2, width:'30%', mb:5}}>
                    Confirm Link
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} >
                <Link to={`/clients/${id}`} style={{ textDecoration: 'none' }}>
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