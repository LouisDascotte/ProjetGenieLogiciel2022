import React from 'react'
import StaffSideMenu from '../pagesStaff/StaffSideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, Select} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import { ClientList as Clients} from '../resources/Lists';
import StaffTopMenu from '../pagesStaff/StaffTopMenu';
import TextField from '@mui/material/TextField';

function NewContract() {

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
    alert('contract created');
  };

  let gasVisible;
  let elecVisible;
  
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

  const newContractData = {
    clientID: '',
    address: '',
    contractType: '',
    meterIdGas: '',
    meterIdElec: '',
    meterType: '',
    offer: '',
  };

  const pageAddress = "/staff-contracts/new";
  const pageName = "New contract";

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <StaffSideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <StaffTopMenu pageAddress={pageAddress} pageName={pageName}/>
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
                      label="enter the client's ID"
                      variant="outlined"
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
                      label="enter the client's address"
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
                      label="city :"
                      variant="outlined"  
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
                        <Select
                        native
                        id="country"
                        label=""
                        defaultValue={'BE'}
                        variant="outlined"
                        size='small'
                        fullWidth
                        >
                          <option value="FR">France</option>
                          <option value="BE">Belgium</option>
                          <option value="DE">Germany</option>
                          <option value="NL">Netherlands</option>
                        </Select>
                      </Grid>
                      <Grid item
                      xs={5.5}
                      >
                        <TextField
                        id="zipCode"
                        label="postal code :"
                        variant="outlined"
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
                      <Select
                      native
                      id="contractType"
                      label=""
                      defaultValue={'electricity'}
                      value={energyChosen}
                      onChange={(event) => {setEnergyChosen(event.target.value)}}
                      variant="outlined"
                      size='small'
                      fullWidth
                      >
                        <option value="elec">Electricity</option>
                        <option value="gas">Gas</option>
                        <option value="elecGas">Electricity and Gas</option>
                      </Select>
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
                      label="enter EAN (gas) :"
                      variant="outlined"
                      size='small'
                      fullWidth
                      disabled={gasVisible ? false : true}
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
                      label="enter EAN (elec) :"
                      variant="outlined"
                      size='small'
                      fullWidth
                      disabled={elecVisible ? false : true}
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
                      <Select
                      native
                      id="meterType"
                      label=""
                      defaultValue={'manual'}
                      variant="outlined"
                      size='small'
                      fullWidth
                      >
                        <option value="manual">Manual</option>
                        <option value="auto">Automatic</option>
                      </Select>
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
                      <Select
                      native
                      id="offer"
                      label=""
                      defaultValue={'basic'}
                      variant="outlined"
                      size='small'
                      fullWidth
                      >
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                      </Select>
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
                    <Link to='/staff-contracts'>
                      <Button variant="outlined" color="error" >
                        Cancel
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item
                  >
                    <Button variant="outlined" onClick={handleContractCreation} color="primary" >
                      Confirm Contract
                    </Button>
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

export default NewContract;