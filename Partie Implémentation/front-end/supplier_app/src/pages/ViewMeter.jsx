import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Grid, Button, ThemeProvider, createTheme, Hidden, List, ListItem,ListItemText} from '@mui/material';
import {Link, useParams, useNavigate} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBack from '@mui/icons-material/ArrowBack';
import axios from 'axios';


const ViewMeter = () => {
  const id = useParams().meterId;
  const nav = useNavigate();

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

  const pageAddress = "/consumption/meter/:id";
  const pageName = "Manage consumption";

  const meterId = useParams().meterId;

  const API_URL = "http://localhost:8080/api/meter/";

  const [readings, setReadings] = React.useState([]);

  useEffect(() => {
    async function getReadings() {
      try {
        const jwt = localStorage.getItem("jwt");
        const config = {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          }
        };
        const response = await axios.get(API_URL+meterId+"/readings", config);

        console.log(response.data);
        setReadings(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getReadings();
  }, [meterId]);

  const handleMeterClick = (meterID) => {
    console.log(meterID);
  };
  
  const handleReadingDeletion = () => {
    alert('DELETE request sent to server');
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={"false"} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'40%', m:2, height:'60%'}}>
                <Link to={'/consumption'} >
                  <Button variant="contained" fullWidth color="primary" startIcon={<ArrowBack />} >
                    Retour
                  </Button>
                </Link>
              <List style={{maxHeight: '100%', overflow: 'auto'}} >
                { readings.length === 0 ? <h3>No readings found</h3>
                :
                readings.map((reading) => (
                  <ListItem key={reading.date}>
                    <ListItemText primary={`${reading.date}`} />
                      <Button variant="contained" color='primary' onClick={() => nav(`/consumption/meter/${id}/${reading.date}`, {state : reading})}>
                      See more
                      </Button>

                  </ListItem>
                ))
                }
              </List>
            </Card>
            
            <ThemeProvider theme={theme}>
            <Grid item xs={12} align='center'>
                <Link to={`/consumption/meter/${id}/import`} className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                  <Button  variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                    Import Data
                  </Button>
                </Link>
              </Grid>
            </ThemeProvider>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
  

export default ViewMeter