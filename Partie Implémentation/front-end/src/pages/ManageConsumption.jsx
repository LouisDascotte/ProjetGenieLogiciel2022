import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Grid, Button, ThemeProvider, createTheme, Hidden, List, ListItem,ListItemText, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { MeterList as Meters} from '../resources/Lists';
import axios from 'axios';

const handleMeterClick = (meterID) => {
  console.log(meterID);
};

const ManageCons = () => {
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
      deletion : {
        main: "#ff0000",
        contrastText: '#000000'
      }
    }
  });
  const pageAddress = "/consumption";
  const pageName = "Manage consumption";

  const API_URL = "http://localhost:8080/api/meter/";

  const [meters, setMeters] = React.useState([]);

  useEffect(() => {
    async function getMeters() {
      try {        
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: { 
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get(API_URL+"all", config);
        console.log(response.data);
        setMeters(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMeters();
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'40%', m:2, height:'60%'}}>
              <List style={{maxHeight: '100%', overflow: 'auto'}} >
                {Meters.sort((a, b) => a.meterId - b.meterId).map((meter) => (
                  <ListItem key={meter.meterId}>
                    <Link to={`/consumption/meter/${meter.meterId}`} className='link-3' style={{display: 'inline-block', mt:2, width:'100%', mb:5}} >
                      <Button variant="contained" color='primary' onClick={() => handleMeterClick(meter.meterId)} fullWidth >
                      {`Meter n°${meter.meterId}`}
                      </Button>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Card>
            <Card sx={{width:'40%', m:2, height:'60%'}}>
              <List style={{maxHeight: '100%', overflow: 'auto'}} >
                <Typography variant="h4" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Linked Meters
                </Typography>
                <Typography variant="h6" component="h4" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  {meters[0]?.meterId}
                </Typography>
                <Typography variant="h6" component="h4" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  {meters[1]?.meterId}
                </Typography>
              </List>
            </Card>
            
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
  

export default ManageCons