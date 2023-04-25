import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, Select} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import TextField from '@mui/material/TextField';
import axios from '../api/axios';
import { ArrowBack } from '@mui/icons-material';


function ContractRequest() {
  const request = useLocation().state;
  const [offer, setOffer] = React.useState([]);
  console.log(request);

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

  useEffect(() => {
    async function getOfferDetails() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get("http://localhost:8080/api/contract/supplier_offers", config);
        const myOffer = response.data.filter((offer) => offer.id === request.offerId)[0];
        setOffer(myOffer);
      } catch (error) {
        console.log(error);
      }
    }
    getOfferDetails();
  }, []);


  const handleContractCreation = () => {
    const API_URL = `http://localhost:8080/api/contract/${request.id}/accept`;
    try {
      const jwt = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        }
      };
      axios.put(API_URL, {}, config);
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleContractDenial = () => {
    const API_URL = `http://localhost:8080/api/contract/${request.id}`;
    try {
      const jwt = localStorage.getItem("jwt");
      const config = {
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        }
      };
      axios.delete(API_URL, config);
    }
    catch (error) {
      console.log(error);
    }
  };

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
                <Link to={'/contracts/requests'} >
                  <Button variant="contained" fullWidth color="primary" startIcon={<ArrowBack />} >
                    Retour
                  </Button>
                </Link>
                <Grid container
                spacing={2}
                sx={{width:'80%', height:'100%'}}
                padding={1}
                justifyContent='end'
                >
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
                      id="clientID"
                      label=""
                      variant="outlined"
                      value={request.clientId}
                      InputProps={{
                        readOnly: true,
                      }}
                      size='small'
                      fullWidth
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
                      id="contractType"
                      label=""
                      variant="outlined"
                      value={request.type === "SIMPLE_CONTRACT" ? "Simple contract" : "Gaz & Electricity"}
                      size='small'
                      fullWidth
                      InputProps={{
                        readOInly: true,
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
                    { request.type === "SIMPLE_CONTRACT" && offer.energyType === "ELEC" ?
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
                        id="meterIdElec"
                        label=""
                        variant="outlined"
                        value={request.ean || ""}
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
                          EAN (electricity) :
                        </Typography>
                      </Grid>
                    </Grid>
                    : 
                    request.type === "SIMPLE_CONTRACT" && offer.energyType === "GAZ" ?
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
                        label=""
                        variant="outlined"
                        value={request.ean || ""}
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
                          EAN (gas) :
                        </Typography>
                      </Grid>
                    </Grid>
                    : 
                    request.type === "SIMPLE_CONTRACT" && offer.energyType === "WATER" ?
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
                        id="meterIdWater"
                        label=""
                        variant="outlined"
                        value={request.ean || ""}
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
                          EAN (water) :
                        </Typography>
                      </Grid>
                    </Grid>
                    : 
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
                        id="meterIdElec"
                        label=""
                        variant="outlined"
                        value={request.ean_ELEC || ""}
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
                          EAN (electricity) :
                        </Typography>
                      </Grid>
                      <Grid item
                      xs={9}
                      >
                        <TextField
                        id="meterIdGas"
                        label=""
                        variant="outlined"
                        value={request.ean_GAZ || ""}
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
                          EAN (gas) :
                        </Typography>
                      </Grid>
                    </Grid>
                    }
                  </Grid>
                  { offer !== null ?
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
                      id="offerId"
                      label=""
                      variant="outlined"
                      value={request.offerId}
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
                        Offer ID :
                      </Typography>
                    </Grid>
                  </Grid>
                : null }
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