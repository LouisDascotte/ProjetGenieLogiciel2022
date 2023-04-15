import React from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Grid, Button, ThemeProvider, createTheme, Hidden, List, ListItem,ListItemText} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import { MeterList as Meters, MeterReadingList as Readings } from '../resources/Lists';
import ArrowBack from '@mui/icons-material/ArrowBack';


const ViewMeter = () => {
  const id = useParams().id;

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

  const handleMeterClick = (meterID) => {
    console.log(meterID);
  };
  
  const handleReadingDeletion = () => {
    alert('DELETE request sent to server');
  };
  
  const getReadingBytMeterId = (meterID) => {
    const idInt = parseInt(meterID,10);
    return Readings.filter((reading) => reading.meterId === idInt);
  };
  
  const reads = getReadingBytMeterId(id);

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
                {reads.map((reading) => (
                  <ListItem key={reading.date}>
                    <ListItemText primary={`${reading.date}`} />
                    <Link to={`/consumption/meter/${id}/${reading.date}`} className='link-3' style={{display: 'inline-block', mt:2, width:'40%', mb:5}}>
                      <Button variant="contained" color='primary' onClick={() => handleMeterClick(reading.meterId)}>
                      See more
                      </Button>
                    </Link>
                    <Button variant="contained" color='primary' onClick={handleReadingDeletion} >
                      <DeleteIcon />
                    </Button>
                  </ListItem>
                ))}
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