import React from 'react'
import SideMenu from '../components/SideMenu'
import {ArrowBack} from '@mui/icons-material'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, TextField, FormControl, OutlinedInput, InputLabel, Input} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients, MeterList } from '../resources/Lists';



const StaffAddClient = () => {
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
        main: "#ff0000",
        contrastText: '#000000'
      }
    }
  });

  const pageAddress = "/staff-clients";
  const pageName = "New Client";

  const [newClientID, setClientID] = React.useState('');

  const handleNewClient = () => {
    alert(`New client ${newClientID} added`);
  };
  const isButtonDisabled = newClientID.trim() === '';

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid container
          align='center'
          justifyContent='center'
          paddingTop={16}
          rowSpacing={8}
          >
            <Grid item container
            direction='row'
            justifyContent='center'
            alignItems='center'
            columnSpacing={2}
            >
              <Grid item xs='auto'>
                <Typography variant="h6" component="h2" align="center"  >
                  Client's ID: 
                </Typography>
              </Grid>
              <Grid item xs='auto'>
                <TextField
                id='clientID'
                label='Client ID'
                variant='outlined'
                value={newClientID}
                onChange={(e) => setClientID(e.target.value)}
                type='number'
                InputProps={{ disableUnderline: true }}
                />
              </Grid>
            </Grid>
            <Grid item container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            >
              <Grid item xs={6}>
                <Link to='/staff-clients' className='link-3' style={{display: 'inline-block', mt:2, width:'50%', mb:5}}>
                  <Button  variant='outlined' color='error' sx={{mt:2, width:'100%', mb:5}}>
                    Cancel
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'50%', mb:5}} disabled={isButtonDisabled} onClick={handleNewClient} >
                  Add Client
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );

}

export default StaffAddClient