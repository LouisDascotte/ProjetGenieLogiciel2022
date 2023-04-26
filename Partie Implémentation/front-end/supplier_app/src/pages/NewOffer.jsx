import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Grid, Card, Box, Button, Paper, Typography, TextField, FormControl, ToggleButton, ToggleButtonGroup, Checkbox, FormGroup } from '@mui/material';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';



const NewOffer = () => {

  const pageAddress = "/offers/new";
  const pageName = "Create new offer";
  const jwt = localStorage.getItem("jwt");
  const nav = useNavigate();
  let config = {};

  const [form, setForm] = React.useState({
    hourType: "SIMPLE",
    contractLength: 12,
    priceType: "FIXED_PRICE",
    cost: 0,
    nightCost: 0,
    cost_ELEC: 0,
    nightCost_ELEC: 0,
    cost_GAZ: 0,
    nightCost_GAZ: 0,
    energyType: "ELEC",
  });

  const onUpdateField = e => {
    const field = e.target.id; 
    const nextFormState = {
      ...form, 
      [field] : e.target.value,
    };
    setForm(nextFormState);
  };

  const isWater = form.energyType === "WATER";

  const bools = {
    "DOUBLED": (form.energyType === "both") && form.hourType === "DOUBLE",
    "DOUBLES": (form.energyType === "both") && form.hourType === "SIMPLE",
    "SIMPLE": (form.energyType !== "both") && form.hourType === "SIMPLE",
    "DOUBLE": (form.energyType !== "both") && form.hourType === "DOUBLE",
  }
  const isValidOffer = (form.energyType !== null) && (form.hourType !== null) && (form.contractLength !== null) && (form.priceType !== null) && (form.cost !== 0 || form.cost_ELEC !== 0 || form.cost_ELEC !== 0) && (form.nightCost !== null) && (form.nightCost_ELEC !== null) && (form.cost_GAZ !== null) && (form.nightCost_GAZ !== null) && (form.energyType !== null);

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]*$/;
    
    if (!regex.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleEnergyType = (event, newEnergyType) => {
    setForm({ ...form, energyType: newEnergyType });
  };

  const handleContractLength = (event, newContractLength) => {
    setForm({ ...form, contractLength: newContractLength });
  };

  const handleHourType = (event, newHourType) => {
    setForm({ ...form, hourType: newHourType });
  };

  const handlePriceType = (event, newPriceType) => {
    setForm({ ...form, priceType: newPriceType });
  };

  let bodySimple = {
    "hourType": form.hourType,
    "contractLength": form.contractLength,
    "cost": Number(form.cost)/100,
    "nightCost": form.nightCost/100,
    "priceType": form.priceType,
    "energyType": form.energyType,
    "supplierName": localStorage.getItem("name"),
    "type": "SIMPLE_OFFER"
  }

  let bodyBoth = {
    "hourType": form.hourType,
    "contractLength": form.contractLength,
    "cost_ELEC": form.cost_ELEC/100,
    "nightCost_ELEC": form.nightCost_ELEC/100,
    "cost_GAZ": form.cost_GAZ/100,
    "nightCost_GAZ": form.nightCost_GAZ/100,
    "priceType": form.priceType,
    "supplierName": localStorage.getItem("name"),
    "type": "GAZ_ELEC_OFFER"
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
  const API_URL = "http://localhost:8080/api/contract/";

  const handleCreateOffer = () => {
    switch (form.energyType) {
      case "both":
        config = {
          headers: { "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        }
        axios.post(API_URL+"offer_gaz_elec", bodyBoth, config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        })
      break;
      case "ELEC":
      case "GAZ":
      case "WATER":
        config = {
          headers: { "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        }
        axios.post(API_URL+"offer", bodySimple, config)
        .then((response) => {
        })
        .catch((error) => {
          console.log(error);
        })
        break;
      default:
        console.log("error");
        break;
    }
    nav("/offers");
  }

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
                          value={form.energyType}
                          exclusive
                          onChange={handleEnergyType}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="WATER" aria-label="left aligned">
                            Water
                          </ToggleButton>
                          <ToggleButton value="GAZ" aria-label="left aligned">
                            Gas
                          </ToggleButton>
                          <ToggleButton value="ELEC" aria-label="centered">
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
                          <RadioGroup row aria-label="contractLength" name="row-radio-buttons-group" defaultValue={12} onChange={handleContractLength} >
                            <FormControlLabel value={6} control={<Radio />} label="6 mth" />
                            <FormControlLabel value={12} control={<Radio />} label="12 mth" />
                            <FormControlLabel value={24} control={<Radio />} label="24 mth" />
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
                          value={form.hourType}
                          exclusive
                          onChange={handleHourType}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="SIMPLE" aria-label="left aligned">
                            Simple
                          </ToggleButton>
                          <ToggleButton value="DOUBLE" disabled={isWater} aria-label="centered">
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
                          Price type:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <ToggleButtonGroup
                          color="primary"
                          value={form.priceType}
                          exclusive
                          onChange={handlePriceType}
                          aria-label="text alignment"
                        >
                          <ToggleButton value="FIXED_PRICE" aria-label="left aligned">
                            Fixed
                          </ToggleButton>
                          <ToggleButton value="VAR_PRICE" aria-label="centered">
                            Variable
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </Grid>
                    </Grid>

                    { bools.DOUBLES ?
                      <Grid item container
                      justifyContent='center'
                      alignItems='center'
                      columnSpacing={1}
                      rowSpacing={1}
                      >
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            Price per kWh:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <TextField id="cost_ELEC" label="Price in c€" size='small' variant="outlined" inputProps={{ onKeyPress: handleKeyPress }} defaultValue={16}  onChange={onUpdateField} />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            Price per m3:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <TextField id="cost_GAZ" label="Price in c€" size='small' variant="outlined" inputProps={{ onKeyPress: handleKeyPress }} defaultValue={68} onChange={onUpdateField} />
                        </Grid>
                      </Grid>
                      : null}
                      
                      { bools.SIMPLE ?
                      <Grid item container
                      justifyContent='center'
                      alignItems='center'
                      columnSpacing={1}
                      rowSpacing={1}
                      >
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            Price per {form.energyType === "GAZ" || form.energyType === "WATER" ? "m3" : "kWh"}:
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <TextField id="cost" label="Price in c€" size='small' variant="outlined" inputProps={{ onKeyPress: handleKeyPress }}  onChange={onUpdateField} />
                        </Grid>
                      </Grid>
                      : null}
                      
                      {bools.DOUBLED ?
                      <Grid item container
                      justifyContent='center'
                      alignItems='center'
                      columnSpacing={1}
                      rowSpacing={1}
                      >
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            Prices per kWh:
                          </Typography>
                        </Grid>
                        <Grid item container
                        justifyContent='center'
                        alignItems='center'
                        columnSpacing={1}
                        xs={8}
                        >
                          <Grid item xs={4}>
                            <TextField id="cost_ELEC" label="Day: c€" variant="outlined" size='small' inputProps={{ onKeyPress: handleKeyPress }} onChange={onUpdateField} style={{width: 150}} />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField id="nightCost_ELEC" label="Night: c€" variant="outlined" size='small' inputProps={{ onKeyPress: handleKeyPress }} onChange={onUpdateField} style={{width: 150}} />
                          </Grid>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            Price per m3:
                          </Typography>
                        </Grid>
                        <Grid item container
                        justifyContent='center'
                        alignItems='center'
                        columnSpacing={1}
                        xs={8}
                        >
                          <Grid item xs={4}>
                          <TextField id="cost_GAZ" label="Day: c€" variant="outlined" size='small' inputProps={{ onKeyPress: handleKeyPress }} onChange={onUpdateField} style={{width: 150}} />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField id="nightCost_GAZ" label="Night: c€" variant="outlined" size='small' inputProps={{ onKeyPress: handleKeyPress }} onChange={onUpdateField} style={{width: 150}} />
                          </Grid>
                        </Grid>
                      </Grid>
                      : null}
                      
                      {bools.DOUBLE ?
                      <Grid item container
                      justifyContent='center'
                      alignItems='center'
                      columnSpacing={1}
                      rowSpacing={1}
                      >
                        <Grid item xs={4}>
                          <Typography variant="h6" component="h2" gutterBottom>
                            Prices per {form.energyType === "gas" || form.energyType === "water" ? "m3" : "kWh"}:
                          </Typography>
                        </Grid>
                        <Grid item container
                        justifyContent='center'
                        alignItems='center'
                        columnSpacing={1}
                        xs={8}
                        >
                          <Grid item xs={4}>
                            <TextField id="cost" label="Day: c€" variant="outlined" size='small' inputProps={{ onKeyPress: handleKeyPress }} onChange={onUpdateField} style={{width: 150}} />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField id="nightCost" label="Night: c€" variant="outlined" size='small' inputProps={{ onKeyPress: handleKeyPress }} onChange={onUpdateField} style={{width: 150}} />
                          </Grid>
                        </Grid>
                      </Grid>
                      : null }
                  </Grid> 
                </Box>
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
                <Button variant="contained" onClick={handleCreateOffer} disabled={!isValidOffer} color="primary" sx={{ width: '60%' }} >
                  Confirm offer
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