import React, { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, Select, MenuItem, ToggleButtonGroup, ToggleButton} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import TextField from '@mui/material/TextField';
import axios from '../api/axios';
import WaterIcon from '@mui/icons-material/Water';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

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

  const API_URL = 'http://localhost:8080/api/contract/supplier_offers';

  const handleContractCreation = () => {
    /*
    async function createContract() {
      try {
        const jwt = localStorage.getItem('jwt');
        const config = {
          headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        };
        if (form.contractType === 'GAZ_ELEC') {
          const response = await axios.post('http://localhost:8080/api/contract', bodyDouble, config);
          console.log(response.data);
        } else {
          const response = await axios.post('http://localhost:8080/api/contract', bodySimple, config);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    createContract();
    */
  };

  const handleContractTypeChange = (event, newContractType) => {
    setForm({ ...form, contractType: newContractType });
    console.log(form.contractType);
  };

  const [offerDispo, setOfferDispo] = React.useState([]);

  useEffect(() => {
    async function getOffers() {
      try {
        const jwt = localStorage.getItem('jwt');
        const config = {
          headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get(API_URL, config);
        setOfferDispo(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOffers();
  }, []);

  const [form, setForm] = useState({
    clientId: '',
    contractType: 'WATER',
    offerId: '',
    startDate: '',
    endDate: '',
    EAN_ELEC: '',
    EAN_GAZ: '',
    EAN: '',
    supplierId: '',
    energyType: 'ELEC',
  });

  const formValid = (form.clientId.length === 18) && (form.offerId !== ''); 

  const offers = offerDispo.filter(offer => offer.energyType === form.contractType);

  const onUpdateField = e => {
    const field = e.target.id; 
    const nextFormState = {
      ...form, 
      [field] : e.target.value,
    };
    setForm(nextFormState);
    console.log(form);
  };

  const bodySimple = {
    "clientId": form.clientId,
    "supplierId": form.supplierId,
    "startDate": form.startDate,
    "endDate": form.endDate,
    "type": 'SIMPLE_CONTRACT',
    "EAN": form.EAN,
    "offerId": form.offerId,
    "status": 'ACCEPTED'
  };

  const bodyDouble = {
    "clientId": form.clientId,
    "supplierId": form.supplierId,
    "startDate": form.startDate,
    "endDate": form.endDate,
    "type": 'GAZ_ELEC_CONTRACT',
    "EAN_ELEC": form.EAN_ELEC,
    "EAN_GAZ": form.EAN_GAZ,
    "offerId": form.offerId,
    "status": 'ACCEPTED'
  };

  const pageAddress = "/contracts/new";
  const pageName = "New contract";

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
                  rowSpacing={1}
                  >
                    <Grid item
                    xs={9}
                    >
                      <TextField
                      id="clientId"
                      label="enter the client's ID"
                      value={form.clientId || ''}
                      onChange={(event) => onUpdateField(event)}
                      variant="outlined"
                      size='small'
                      fullWidth
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Client's ID:
                      </Typography>
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
                      <ToggleButtonGroup
                          color="primary"
                          value={form.contractType}
                          exclusive
                          onChange={handleContractTypeChange}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="WATER" aria-label="left aligned">
                            <WaterIcon />
                          </ToggleButton>
                          <ToggleButton value="ELEC" aria-label="centered">
                            <ElectricBoltIcon />
                          </ToggleButton>
                          <ToggleButton value="GAZ" aria-label="centered">
                            <WhatshotIcon />
                          </ToggleButton>
                          <ToggleButton value="GAZ_ELEC" aria-label="right aligned">
                            <ElectricBoltIcon /> + <WhatshotIcon />
                          </ToggleButton>
                        </ToggleButtonGroup>
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
                      <Select
                      native
                      id="offerId"
                      label=""
                      value={form.offerId}
                      onChange={(event) => onUpdateField(event)}
                      variant="outlined"
                      size='small'
                      fullWidth
                      >
                        {offers.map((offer) => (
                          <option key={offer.id} value={offer.id}>
                            {offer.id}
                          </option>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        Offer :
                      </Typography>
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
                      id="meterIdGas"
                      required
                      label="enter EAN (gas) :"
                      variant="outlined"
                      size='small'
                      fullWidth
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        EAN (gas) :
                      </Typography>
                    </Grid>
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
                      />
                    </Grid>
                    <Grid item
                    xs={3}
                    >
                      <Typography variant="body1" component="h2" align="center" >
                        EAN (elec) :
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
                    <Link to='/contracts'>
                      <Button variant="outlined" color="error" >
                        Cancel
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item
                  >
                    <Button variant="outlined" disabled={!formValid} onClick={handleContractCreation} color="primary" >
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