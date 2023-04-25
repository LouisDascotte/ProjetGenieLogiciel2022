import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Grid, Card, Box, Button, Paper, Typography } from '@mui/material';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom';
import axios from '../api/axios';



const ManageOffer = () => {

  const pageAddress = "/offers";
  const pageName = "Manage offers";

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

  const [offers, setOffers] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const avgCons = 320;
  const avgConsDay = 133;
  const avgConsNight = 158;
  const avgWtrCons = 0.148*30;

  const API_URL = "http://localhost:8080/api/contract";

  useEffect(() => {
    async function getOffers() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: { Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get(API_URL+"/supplier_offers", config);
        setOffers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOffers();
  }, []);

  console.log(offers);

  const getOfferIdFromIndex = (list, index) => {
    const id = list[index].id.toString();
    return id.slice(0, 12);
  }

  async function deleteOffer(offerId) {
    try {
      const jwt = localStorage.getItem("jwt");
      const config = {
        headers: { Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        }
      };
      const response = await axios.delete(API_URL + "/offer/" + offerId, config);
      setOffers(offers.filter((item) => item.id !== offerId));
      setActiveIndex(activeIndex - 1);
    } catch (error) {
      console.log(error);
    }
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
            margin={2} >
              <Grid item xs={4}
              >
                <Carousel
                autoPlay={false}
                stopAutoPlayOnHover
                index={activeIndex}
                >
                  {offers.map((item, index) => (
                    <Paper key={index} >
                      <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        padding={2}
                        >
                          <Grid item xs >
                            <Typography variant="h4" component="h2" gutterBottom>
                              Offer #{getOfferIdFromIndex(offers, index)}
                            </Typography>
                          </Grid>
                          <Grid item container
                          justifyContent='flex-start'
                          >
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Duration: {item.contractLength} months
                              </Typography>
                            </Grid>
                            { item.type === "GAZ_ELEC_OFFER" && item.hourType === "DOUBLE" ?
                              <Grid container
                              justifyContent='center'
                              >
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>

                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    Elec during day: {(item.cost_ELEC)}€/kWh
                                  </Typography>
                                </Grid> 
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    Elec during night: {(item.nightCost_ELEC)}€/kWh
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    Gas during day: {(item.cost_GAZ)}€/m3
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    Gas during night: {(item.nightCost_GAZ)}€/m3
                                  </Typography>
                                </Grid>
                              </Grid>
                            : null}

                            { item.type === "GAZ_ELEC_OFFER" && item.hourType === "SIMPLE" ?
                              <Grid container
                              justifyContent='center'
                              >
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    Elec: {(item.cost_ELEC)}€/kWh
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    Gas: {(item.cost_GAZ)}€/m3
                                  </Typography>
                                </Grid>
                              </Grid>
                            : null}

                            { item.type !== "GAZ_ELEC_OFFER" && item.hourType === "SIMPLE" ?
                              <Grid container
                              justifyContent='center'
                              >
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    {item.energyType === "ELEC" ? "Elec" : item.energyType === "GAS" ? "Gas" : "Water"}: {(item.cost)}€/{item.energyType === "ELEC" ? "kWh" : "m3"}
                                  </Typography>
                                </Grid>
                              </Grid>
                            : null}

                            { item.type !== "GAZ_ELEC_OFFER" && item.hourType === "DOUBLE" ?
                              <Grid container
                              justifyContent='center'
                              >
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    {item.energyType === "ELEC" ? "Elec" : "Gas"} during day: {(item.cost)}€/{item.energyType === "ELEC" ? "kWh" : "m3"}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body1" gutterBottom>
                                    {item.energyType === "ELEC" ? "Elec" : "Gas"} during night: {(item.nightCost)}€/{item.energyType === "ELEC" ? "kWh" : "m3"}
                                  </Typography>
                                </Grid>
                              </Grid>
                            : null}

                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Price type: {item.priceType === "FIXED_PRICE" ? "Fixed" : "Variable" }
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Energy type: {item.energyType === "ELEC" ? "Electricity" : item.energyType === "GAS" ? "Gas" : item.energyType === "WATER" ? "Water" : "Electricity and Gas"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              { item.type === "GAZ_ELEC_OFFER" ?
                                <Typography variant="h5" gutterBottom>
                                  { item.nightCost_ELEC !== 0 ? item.cost_ELEC*avgConsDay + item.nightCost_ELEC*avgConsNight + item.cost_GAZ*avgConsDay + item.nightCost_GAZ*avgConsNight
                                  :
                                  item.cost_ELEC*avgCons + item.cost_GAZ*avgCons}€/month
                                </Typography>
                              : 
                                <Typography variant="h5" gutterBottom>
                                  { item.nightCost !== 0 ? 
                                  item.cost*avgConsDay + item.nightCost*avgConsNight
                                  :
                                  item.energyType === "WATER" ? (item.cost*avgWtrCons).toFixed(2) :
                                  (item.cost*avgCons).toFixed(2)}€/month
                                </Typography>
                              }
                            </Grid>
                          </Grid>
                          <Grid item xs >
                            <Button variant="contained" onClick={() => deleteOffer(item.id) } color="error" sx={{ width: "100%" }} >
                              Delete
                            </Button>
                          </Grid>
                        </Grid>
                    </Paper>
                  ))}
                </Carousel>
              </Grid>
              <Grid item xs={12}>
                <Link to="/offers/new" className='link' >
                  <Button variant="contained" color="primary" sx={{ width: "33%" }} >
                    Create new offer
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
export default ManageOffer;