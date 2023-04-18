import React from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, Select} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import { ClientList as Clients, ContractRequestList as Requests } from '../resources/Lists';
import { useParams } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import TextField from '@mui/material/TextField';

function ContractRequest() {
  const id = useParams().requestId;

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
        contrastText : '#000000'
      }
    }
  });

  const [energyChosen, setEnergyChosen] = React.useState('elec');

  const handleContractCreation = () => {
    alert('PUT request to create contract & DELETE request to delete request && send email to client');
  };

  const handleContractDenial = () => {
    alert('DELETE request to delete request && send email to client');
  };

  let gasVisible = false;
  let elecVisible = false;

  switch(energyChosen) {
    case 'elecGas':
      gasVisible = true;
      elecVisible = true;
      break;
    case 'gas':
      gasVisible = true;
      elecVisible = false;
      break;
    default:
    case 'elec':
      gasVisible = false;
      elecVisible = true;
      break;
  }
  function getRequestDataById(id) {
    const idInt = parseInt(id,10);
    const request = Requests.find((request) => request.contractRequestId === idInt)
    if (request) {
      return request.data;
    }
    return null;
  }

  const requestData = getRequestDataById(id);

  const pageAddress = "/contracts/requests/:id";
  const pageName = "Contract Request";

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'80%', m:2, height:'auto'}}>
              <Box sx={{height:'100%', width:'100%'}} alignment='center' >
                <Grid container
                spacing={2}
                sx={{width:'80%', height:'100%'}}
                padding={1}
                justifyContent='end'
                >
                  <Grid item container
                  xs={12}
                  alignItems='center'
                  direction='row-reverse'
                  columnSpacing={2}
                  rowSpacing={1}
                  >
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="clientID"
                      label=""
                      variant="outlined"
                      value={requestData.clientId}
                      InputProps={{
                        readOnly: true,
                      }}
                      size='small'
                      fullWidth
                      type='number'
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Client ID : 
                      </Typography>
                    </Grid>
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="address"
                      label=""
                      value={requestData.address}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                      size='small'
                      fullWidth
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Address :
                      </Typography>
                    </Grid>
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="city"
                      label=""
                      variant="outlined"
                      value={requestData.city}
                      InputProps={{
                        readOnly: true,
                      }}
                      size='small'
                      fullWidth
                      />
                    </Grid>
                    <Grid item
                    container
                    justifyContent='space-between'
                    xs={9}
                    >
                      <Grid item
                      xs={5.5}
                      >
                        <TextField
                        id='country'
                        label=""
                        variant="outlined"
                        value={requestData.country}
                        InputProps={{
                          readOnly: true,
                        }}
                        size='small'
                        fullWidth
                        >
                        </TextField>
                      </Grid>
                      <Grid item
                      xs={5.5}
                      >
                        <TextField
                        id="zipCode"
                        label=""
                        variant="outlined"
                        value={requestData.zipCode}
                        InputProps={{
                          readOnly: true,
                        }}
                        size='small'
                        fullWidth
                        type='number'
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item container
                  xs={12}
                  justifyContent='center'
                  alignItems='center'
                  direction='row-reverse'
                  rowSpacing={1}
                  >
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="contractType"
                      label=""
                      variant="outlined"
                      value={requestData.contractType}
                      size='small'
                      fullWidth
                      InputProps={{
                        readonly: true,
                      }}
                      >
                      </TextField>
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Contract type :
                      </Typography>
                    </Grid>
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="meterIdGas"
                      label=""
                      variant="outlined"
                      value={requestData.meterIdGas}
                      size='small'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      type='number'
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        EAN (gas) :
                      </Typography>
                    </Grid>
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="meterIdElec"
                      label=""
                      variant="outlined"
                      value={requestData.meterIdElec}
                      size='small'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      type='number'
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        EAN (elec) :
                      </Typography>
                    </Grid>
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="meterType"
                      label=""
                      variant="outlined"
                      value={requestData.meterType}
                      size='small'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Meter type :
                      </Typography>
                    </Grid>
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="offer"
                      label=""
                      variant="outlined"
                      value={requestData.offer}
                      size='small'
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Offer :
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container
                spacing={2}
                sx={{width:'80%', height:'100%'}}
                padding={1}
                justifyContent='space-between'
                >
                  <Grid item
                  >
                    <Link to='/contracts/requests' className='link-3' >
                      <Button variant="outlined" color="error" onClick={handleContractDenial} >
                        Deny Request
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item
                  >
                    <Link to='/contracts/requests' className='link-3' >
                      <Button variant="outlined" onClick={handleContractCreation} color="primary" >
                        Approve Request
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ContractRequest;