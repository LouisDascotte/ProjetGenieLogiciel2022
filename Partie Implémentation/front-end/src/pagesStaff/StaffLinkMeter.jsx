import React from 'react'
import StaffSideMenu from '../pagesStaff/StaffSideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';

function LinkMeter() {
  const id = useParams().id;
  const [newMeterID, setNewMeterID] = React.useState(null);

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

  const pageAddress = "/staff-clients/:id/link-meter";
  const pageName = "Link meter to client";

  const getClientById = (id) => {
    const idInt = parseInt(id,10);
    return Clients.find((client) => client.clientID === idInt);
  };
  const client = getClientById(id);

  function getClientName() {
    return client.name;
  }
  const handleConfirmLink = () => {
    alert(`Meter (${newMeterID}) linked to client ${getClientName()}, ${id}`);
  };

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <StaffSideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Grid container
            justifyContent='center'
            alignItems='center'
            >
              <Grid item xs={12} >
                <Typography variant='h5' sx={{mt:2, mb:2}}>
                  {getClientName()}
                </Typography>
              </Grid>
              <Grid item xs={3} >
                <Typography variant='h6' sx={{mt:2, mb:2}}>
                  Begin date: 
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <DatePicker/>
              </Grid>
              <Grid item xs={3} >
              </Grid>
              <Grid item xs={3} justifyContent='end' >
                <Typography variant='h6' sx={{mt:2, mb:2}} >
                  End date:
                </Typography>
              </Grid>
              <Grid item xs={6} >
                <DatePicker/>
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
                  id="meterID"
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
                <Button  variant='outlined' color='secondary' onClick={handleConfirmLink} sx={{mt:2, width:'30%', mb:5}}>
                  Confirm Link
                </Button>
              </Grid>
              <Grid item xs={12} >
                <Link to={`/staff-clients/${id}`} style={{ textDecoration: 'none' }}>
                  <Button  variant='outlined' color='error' sx={{mt:2, width:'auto', mb:5}}>
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