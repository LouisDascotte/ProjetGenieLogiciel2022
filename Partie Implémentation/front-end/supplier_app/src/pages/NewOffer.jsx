import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Grid, Card, Box, Button, Paper, Typography, TextField, FormControl, ToggleButton, ToggleButtonGroup, Checkbox, FormGroup } from '@mui/material';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';



const NewOffer = () => {

  const pageAddress = "/offers/new";
  const pageName = "Create new offer";

  const [energyType, setEnergyType] = React.useState('gas');
  const [hourType, setHourType] = React.useState('simple');
  const [priceType, setPriceType] = React.useState('fixed');
  const [contractLength, setContractLength] = React.useState(6);
  const [cost, setCost] = React.useState(0.25);
  const [nightCost, setNightCost] = React.useState(0);

  const isWater = energyType === "water";

  const handleEnergyType = (e) => {
    const newEnergyType = e.target.value;
    setEnergyType(newEnergyType);
    if (newEnergyType === "water") {
      setHourType("simple");
      console.log(hourType+" "+energyType)
    }
    if (newEnergyType === "both") {
      console.log("both");
    }
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]*$/;

    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleHourType = (event, newHourType) => {
    setHourType(newHourType);
    setNightCost(0);
  }

  async function createOffer() {
    try {
      const jwt = localStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        }
      };
      const response = await axios.post(API_URL, body, config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const printForm = () => {
    console.log(body);
  }

  let body = {
    hourType: hourType,
    contractLength: contractLength,
    cost: cost,
    nightCost: nightCost,
    priceType: priceType,
    energyType: energyType,
  }

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

  const handleCreateOffer = () => {
    switch (energyType) {
      case "both":

        axios.post(API_URL, body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
      break;
      default:
        axios.post(API_URL, body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
    }

  }

  const API_URL = "http://localhost:8000/api/contract/offers";

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center' >
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            margin={2}
            >
              <Card sx={{width:"80%", height:"100%", marginTop:"5%"}}>
                <Box sx={{width:"100%", height:"100%", padding:2}}>
                  <Grid container
                  justifyContent='center'
                  alignItems='center'
                  spacing={1}
                  >
                    <Grid item container
                    justifyContent='flex-start'
                    alignItems='center'
                    columnSpacing={1}
                    >
                      <Grid item xs={4}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          Energy type:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <ToggleButtonGroup
                          color="primary"
                          value={energyType}
                          exclusive
                          onChange={handleEnergyType}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="water" aria-label="left aligned">
                            Water
                          </ToggleButton>
                          <ToggleButton value="gas" aria-label="left aligned">
                            Gas
                          </ToggleButton>
                          <ToggleButton value="electricity" aria-label="centered">
                            Electricity
                          </ToggleButton>
                          <ToggleButton value="both" aria-label="right aligned">
                            Gas & Elec
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    </Grid>

                    <Grid item container
                    justifyContent='center'
                    alignItems='center'
                    columnSpacing={1}
                    >
                      <Grid item xs={4}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          Contract length:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl >
                          <RadioGroup row aria-label="contractLength" name="row-radio-buttons-group" defaultValue={contractLength} >
                            <FormControlLabel value={6} control={<Radio />} label="6 mth" />
                            <FormControlLabel value={12} control={<Radio />} label="12 mth" />
                            <FormControlLabel value={24} control={<Radio />} label="24 mth" />
                            <FormControlLabel value={-1} control={<Radio />} label="undefined*" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>

                    <Grid item container
                    justifyContent='center'
                    alignItems='center'
                    columnSpacing={1}
                    >
                      <Grid item xs={4}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          Hour Type:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <ToggleButtonGroup
                          color="primary"
                          value={hourType}
                          exclusive
                          onChange={handleHourType}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="simple" aria-label="left aligned">
                            Simple
                          </ToggleButton>
                          <ToggleButton value="double" disabled={isWater} aria-label="centered">
                            Double
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    </Grid>

                    <Grid item container
                    justifyContent='center'
                    alignItems='center'
                    columnSpacing={1}
                    >
                      <Grid item xs={4}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          Price per {energyType === "gas" || energyType === "water" ? "m3" : "kWh"}:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField id="outlined-basic" label="Price" size='small' variant="outlined" inputProps={{ onKeyPress: handleKeyPress }} />
                      </Grid>
                    </Grid>
                    { energyType === "both" && 
                    <Grid item container
                    justifyContent='center'
                    alignItems='center'
                    columnSpacing={1}
                    >
                      <Grid item xs={4}>
                        <Typography variant="h6" component="h2" gutterBottom>
                          Price per {energyType === "electricty" ? "kWh" : "m3"} :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField id="outlined-basic" label="Price" size='small' variant="outlined" inputProps={{ onKeyPress: handleKeyPress }} />
                      </Grid>
                    </Grid>}
                    
                    {(hourType === "double") && (energyType === "both") ?

                    : (hourType === "simple" && energyType === "both") ?

                    : (hourType === "double" && energyType !== "both") ?

                    : 

                    }
                  </Grid>
                </Box>
                <Grid container
                direction='row'
                justifyContent='start'
                alignItems='baseline'
                >
                  <Typography variant="body" component="body3" gutterBottom>
                    * - undefined contract length means that the contract will be automatically renewed after the end of the contract period, unless the customer cancels the contract.
                  </Typography>
                </Grid>
                
              </Card>
            </Grid>
            <Grid container
            direction='row'
            justifyContent='center'
            alignItems='center'
            >
              <Grid item xs={4}>
                <Link to="/offers" className='link' style={{ width: '30%'}} >
                  <Button variant="contained" >
                    Back to offers
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" onClick={handleCreateOffer} color="primary" sx={{ width: '60%' }} >
                  Confirm offer
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" onClick={printForm} color="primary" sx={{ width: '60%' }} >
                  Print
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
export default NewOffer;