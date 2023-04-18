import React from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

function ViewClient() {
  const id = useParams().clientId;

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

  const pageAddress = "/client/:id";
  const pageName = "View Client";

  const getClientById = (id) => {
    const idInt = parseInt(id,10);
    return Clients.find((client) => client.clientId === idInt);
  };
  const client = getClientById(id);

  function getClientName() {
    return client.name;
  }
  function getClientAddress() {
    return client.address;
  }
  function getClientPhone() {
    return client.phone;
  }
  function getClientEmail() {
    return client.email;
  }

  const handleRemoveClient = () => {
    alert("DELETE request sent to server ");
  }

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'80%', m:2, height:'70%' }} >
              <Box sx={{height:'100%', width:'100%'}} alignment='center' >
                <Link to={'/clients'} >
                  <Button variant="contained" fullWidth color="primary" startIcon={<ArrowBack />} >
                    Retour
                  </Button>
                </Link>
                <Typography variant="h4" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Client's Details
                </Typography>
                <Grid container 
                spacing={2}
                columnSpacing={2}
                alignItems="baseline"
                justifyContent="center"
                paddingLeft={4}
                paddingBottom={2}
                >
                  <Grid item xs={5}>
                    <Typography variant="h6" component="h4" align="left" fontWeight={800} >
                      Client ID: {id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="h2" align="left" >
                      Email: {getClientEmail()}
                    </Typography>
                  </Grid>
                  <Grid item xs >
                  </Grid>
                  <Grid item xs={5}>
                    <Typography component="h2" align="left" >
                      Name: {getClientName()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="h2" align="left" >
                      Phone: {getClientPhone()}
                    </Typography>
                  </Grid>
                  <Grid item xs >
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h2" align="left" fontWeight={800} >
                      Client's address:
                    </Typography>
                    <Typography component="h2" align="left" >
                      {getClientAddress()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Grid container
            direction='row'
            justifyContent='center'
            alignItems='center'
            >
              <Grid item xs={6} >
                <Link to={`/clients/${client.clientId}/link-meter`} className='link-3' style={{display: 'inline-block', mt:2, width:'60%', mb:5}}>
                  <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                    Link Meter
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6} >
                <Button  variant='outlined' color='secondary' sx={{mt:2, width:'60%', mb:5}}>
                    View Linked Meters
                </Button>             
              </Grid>
              <Grid item xs={12} >
                  <Button  variant='outlined' color='error' onClick={handleRemoveClient} sx={{mt:2, width:'80%', mb:5}}>
                    Remove Client
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ViewClient;