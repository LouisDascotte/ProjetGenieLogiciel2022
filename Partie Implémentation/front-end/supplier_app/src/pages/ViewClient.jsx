import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useLocation} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients, MeterList as Meters} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import axios from '../api/axios';



function ViewClient() {
  const client = useLocation().state;
  console.log(client);

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

  const [linkedMeters, setLinkedMeters] = React.useState([]);

  const API_LINK = "http://localhost:8080/api/meter/linked";

  useEffect(() => {
    async function getLinkedMeters() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: { "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true, },
          params : {clientId : client.id}
        };
        const response = await axios.get(API_LINK, config);
        setLinkedMeters(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getLinkedMeters();
  }, [client.id]);

  const pageAddress = "/client/:id";
  const pageName = "View Client";

  const [openDialog, setOpenDialog] = React.useState(false);

  function getClientName() {
    return client.name;
  }

  const handleRemoveClient = () => {
    alert("DELETE request sent to server ");
  }
  
  const handleClickOpen = () => {
    console.log("open dialog");
    setOpenDialog(true);
  };
  const handleClose = () => {
    console.log("close dialog");
    setOpenDialog(false);
  };

  const getMetersByClientId = (id) => {
    const idInt = parseInt(id,10);
    return Meters.filter((meter) => meter.clientId === idInt);
  };

  const title = "Linked Meters of Client n°"+client.id+" :";
  const description =  linkedMeters.map((meter) => (
    <List>
      <ListItem>
        <ListItemText primary={`meter n°${meter.id}`} />
      </ListItem>
    </List>
  ));

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
                      Client ID: {client.id}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="h2" align="left" >
                      Email: 
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
                      Phone: 
                    </Typography>
                  </Grid>
                  <Grid item xs >
                  </Grid>
                  <Grid item xs={12}>
                    <Typography component="h2" align="left" fontWeight={800} >
                      Client's address:
                    </Typography>
                    <Typography component="h2" align="left" >
                     
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
                <Button  variant='outlined' color='secondary' onClick={handleClickOpen} sx={{mt:2, width:'60%', mb:5}}>
                    View Linked Meters
                </Button>
                {
                  openDialog ?
                  <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                      {title}
                    </DialogTitle>
                    <DialogContent dividers>
                      {getMetersByClientId(client.id).map((meter) => (
                        <List>
                          <ListItem>
                            <Link to={`/consumption/meter/${meter.meterId}`} className='link-3' style={{display: 'inline-block', mt:2, width:'60%', mb:5}}>
                              <ListItemText primary={`meter n°${meter.meterId}`} />
                            </Link>
                          </ListItem>
                        </List>
                      ))}
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                  : null
                }         
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