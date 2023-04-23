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
      console.log(response.data);
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
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Cost: {item.cost}€/month
                              </Typography>
                            </Grid>
                            {item.hourType === "DOUBLE" ?
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Night cost: {item.nightCost}€/month
                              </Typography>
                            </Grid> 
                            : null }
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Price type: {item.priceType === "FIXED_PRICE" ? "Fixed" : "Variable" }
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Supplied by: {item.supplierName}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body1" gutterBottom>
                                Energy type: {item.energyType === "ELEC" ? "Electricity" : item.energyType === "GAS" ? "Gas" : "Electricity and Gas"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              {item.hourType === "DOUBLE" ?
                              <Typography variant="h6" gutterBottom>
                                {(item.cost*avgConsDay + item.nightCost*avgConsNight).toFixed(2)}€/month
                              </Typography>
                              : <Typography variant="h6" gutterBottom>
                                {(item.cost*avgCons).toFixed(2)}€/month
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