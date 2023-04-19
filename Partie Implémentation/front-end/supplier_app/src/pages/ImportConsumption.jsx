import React from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, TextField} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

function ViewClient() {
  const meterId = useParams().meterId;

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
        main: "#f00",
        contrastText : '#000000'
      }
    }
  });

  const pageAddress = "/consumption/meter/:meterId/import";
  const pageName = "Import Meter Consumption";

  const [file, setFile] = React.useState(null);
  const inputRef = React.useRef();
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleDataConfirmation = () => {
    alert('POST file to server');
  };

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid container align='center' justifyContent='center' >
            <Card sx={{width:'80%', m:2, height:'60%' }} >
              <Box sx={{height:'100%', width:'100%'}} alignment='center' >
              
                <Grid container
                alignItems='center'
                justifyContent='center'
                marginTop='2%'
                >
                  <Grid item xs={3} >
                    <Typography variant='h6' sx={{mt:2, mb:2}}>
                      Import file :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} >
                    <input
                      type="file"
                      ref={inputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      accept='.csv, .yaml, .yml'
                    />
                    <Button variant="contained" onClick={handleClick}>
                      Import file
                    </Button>
                    {file && <p>Selected file: {file.name}</p>}
                  </Grid>
                  <Grid item xs={3} >
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Grid container
            alignItems='center'
            justifyContent='center'
            >
              <Grid item xs={12} >
                <Button variant="contained" color='primary' onClick={handleDataConfirmation} sx={{mt:2, mb:2}}>
                  Confirm Data
                </Button>
              </Grid>
              <Grid item xs={12} >
                <Link to={`/consumption/meter/${meterId}`} style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color='error' sx={{mt:2, mb:2}}>
                    Cancel
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

export default ViewClient;