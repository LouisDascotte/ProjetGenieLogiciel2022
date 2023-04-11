import React from 'react'
import StaffSideMenu from '../pagesStaff/StaffSideMenu'
import {ArrowBack} from '@mui/icons-material'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients, MeterList } from '../resources/Lists';



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

  const pageAddress = "/staff-clients";
  const pageName = "Manage clients";

  const [selectedClient, setSelectedClient] = React.useState(null); 

  const handleClientClick = (clientID) => {
    setSelectedClient(clientID);
    console.log(clientID);
  };
  const handleResetClick = () => {
    setSelectedClient(null);
  };

  const getMetersByClientId = (clientID) => {
    const meters = MeterList.filter((meter) => meter.owner === clientID);
    return meters
  };

  const getClientNameById = (clientID) => {
    return Clients.find((client) => client.clientID === clientID).name;
  };

  const renderMeterLink = (meterID) => {
    return (
      <Link to={`/meter/${meterID}`}>
        <Button variant="contained" color="primary">
          See Details
        </Button>
      </Link>
    );
  };

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <StaffSideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'50%', m:2, height:'60%' }} >
              {selectedClient ? (
                <Box sx={{height:'100%', width:'100%'}} alignment='center'>
                  <Button variant="contained" color="primary" startIcon={<ArrowBack />} onClick={handleResetClick} fullWidth='true' >
                    Retour
                  </Button>
                  <Typography variant="h4" component="h2" align="center" fontWeight={400} >
                    Meters of {getClientNameById(selectedClient)}
                  </Typography>
                  <List style={{maxHeight: '100%', overflow: 'auto'}} >
                  {getMetersByClientId(selectedClient).map((meter) => (
                      <ListItem key={meter.meterID} >
                        <ListItemText primary={meter.meterID} />
                        {renderMeterLink(meter.meterID)}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box sx={{height:'100%', width:'100%'}} alignment='center' >
                  <Typography variant="h4" component="h2" align="center" fontWeight={800} >
                    Client List
                  </Typography>
                  <List style={{maxHeight: '100%', overflow: 'auto'}} >
                    {Clients.map((client) => (
                      <ListItem key={client.clientID}>
                        <ListItemText primary={`${client.name}`} />
                        <Button variant="contained" onClick={() => handleClientClick(client.clientID)} >
                          See Details
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Card>
              <Link to='/register-account' className='link-3' style={{display: 'inline-block', mt:2, width:'50%', mb:5}}>
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