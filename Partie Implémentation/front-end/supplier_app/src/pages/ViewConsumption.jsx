import React, { useTransition } from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useLoaderData, useLocation} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';


function LinkMeter() {
  const date = useParams().date;
  const meterId = useParams().meterId;
  const {t} = useTranslation();
  const meter = localStorage.getItem("meter");
  console.log(meter);

  const pageAddress = "/consumption/meter/:meterId/:date";
  const pageName = "View consumption";
  const location = useLocation();
  
  const handleEditClick = () => {
    setEditMode(!editMode);
    setEditableData(readingData);
  }
  const handleEditableDataChange = (event) => {
    const {name, value} = event.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
      }));
  }
  const handleSaveClick = async() => {
    setEditableData(editableData);
    setEditMode(false);
    const jwt = localStorage.getItem("jwt");
     const response = await axios.put(`http://localhost:8080/api/meter/edit_reading`, null, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true},
      params : {
        readingId : location.state.id,
        value : editableData.value,
      }
      }).then(response=>{
        console.log(response);
      }
      ).catch(err=>{
        console.log(err);
      }
    );
  }
  const handleDeleteReading = () => {
    const jwt = localStorage.getItem("jwt");
    const response = axios.delete(`http://localhost:8080/api/meter/reject_reading`, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true},
      params : {
        readingId : location.state.id,
      },
      }).then(response=>{
        console.log(response);
      }
      ).catch(err=>{
        console.log(err);
      }
    );
    setEditableData(readingData);
    setEditMode(false);
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
      },
      error: {
        main: "#f00",
        contrastText : '#000000'
      }
    }
  });

  const readingData = {
    date: date,
    value: location.state.value,
    readingId: location.state.id,
  };

  const [editMode, setEditMode] = React.useState(false);
  const [editableData, setEditableData] = React.useState(readingData);

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'
          >
            <Link to={`/consumption/meter/${meterId}`} >
                  <Button variant="contained" fullWidth color="primary" startIcon={<ArrowBack />} sx={{width: "35%"}} >
                    Retour
                  </Button>
                </Link>
            <Grid container
            justifyContent='center'
            alignItems='center'
            rowSpacing={2}
            padding={2}
            >
              <Grid item xs={4} >
              </Grid>
              <Grid item xs={4} >
                <TextField
                id="meterId"
                label=""
                variant="outlined"
                value={`Meter n°${meterId}`}
                InputProps={
                  {readOnly: !editMode}
                }
                fullWidth
                />
              </Grid>
              <Grid item xs={4} >
              </Grid>
              <Box sx={{width:'100%', height:'100%', mt:2, mb:2}}>
              </Box>
              <Grid item xs={4} >
                <Typography variant='h6' component='h2'>
                  Date :
                </Typography>
              </Grid>
              <Grid item xs={4} >
                <TextField
                id="date"
                label=""
                variant="outlined"
                value={date}
                InputProps={
                  {readOnly: !editMode}
                }
                fullWidth
                />
              </Grid>
              <Grid item xs={4} >
              </Grid>
              <Grid item xs={4} >
                <Typography variant='h6' component='h2'>
                  Value :
                </Typography>
              </Grid>
              <Grid item container xs={4} alignContent='center' columnSpacing={1} >
                <Grid item xs={8} >
                  <TextField
                  id="value"
                  label=""
                  variant="outlined"
                  value={editableData.value}
                  onChange={handleEditableDataChange}
                  name="value"
                  InputProps={
                    {readOnly: !editMode}
                  }
                  />
                </Grid>
              </Grid>
              <Grid item xs={4} >
              </Grid>

              {editMode ? (
              <Grid container
              direction='row'
              justifyContent='center'
              alignItems='center'
              >
                <Grid item xs={12} >
                  <Button  variant='outlined' color='secondary' onClick={handleEditClick} sx={{mt:2, width:'35%', mb:5}}>
                    Cancel Changes
                  </Button>             
                </Grid>
                <Grid item xs={12} >
                  <Link to={`/consumption/meter/${meterId}`}>
                    <Button  variant='outlined' color='error' onClick={handleSaveClick} sx={{mt:2, width:'35%', mb:5}}>
                      Confirm Changes
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            ) : (
              <Grid container
              justifyContent='center'
              alignItems='center'
              >
                <Grid item xs={12} >
                  <Button  variant='outlined' color='secondary' onClick={handleEditClick} sx={{mt:2, width:'35%', mb:5}}>
                    Edit data
                  </Button>
                </Grid>
                <Grid item xs={12} >
                  <Link to={`/consumption/meter/${meterId}`}>
                    <Button  variant='outlined' onClick={handleDeleteReading} color='error' sx={{mt:2, width:'35%', mb:5}}>
                      Delete reading
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            )}
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default LinkMeter;