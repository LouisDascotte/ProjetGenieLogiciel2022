import React, { useEffect } from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, Stack, Typography, Box, TextField} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useLocation} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import axios from '../api/axios';


function ViewContract() {

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

  const location = useLocation();
  const contract = location.state;
  const [offers, setOffers] = React.useState([]);

  const pageAddress = "/contracts/:id";
  const pageName = "View Contract";

  const contractData = {
    id: contract.id,
    beginDate: contract.beginDate,
    endDate: contract.endDate,
    clientId: contract.clientId,
    supplierId: contract.supplierId,
    type: contract.type,
    status: contract.status,
    offerId: contract.offerId,
    ean: contract.ean,
  }

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
        const response = await axios.get("http://localhost:8080/api/contract/supplier_offers", config);
        setOffers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOffers();
  }, []);

  

  const [editMode, setEditMode] = React.useState(false);
  const [editableData, setEditableData] = React.useState(contractData);

  const handleEditClick = () => {
    setEditMode(!editMode);
    setEditableData(contractData);
  }
  const getClientById = async (id) => {
    try {
      const response = await axios.get(`/clients/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


  const handleEditableDataChange = (event) => {
    const {name, value} = event.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
      }));
  }

  const handleSaveClick = () => {
    setEditableData(editableData);
    setEditMode(false);
    alert('PUT request sent to server ');
  }

  const handleCancelContract = () => {
    alert('DELETE request sent to server');
  }

  return (

    <ThemeProvider theme={theme}>
      <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
        <SideMenu mainPage={'false'} />
        <Stack sx={{display:'flex', width:"100%"}}>
          <TopMenu pageAddress={pageAddress} pageName={pageName}/>
          <Grid align='center'>
            <Card sx={{width:'80%', m:2, height:'auto' }} >
              <Box sx={{height:'100%', width:'100%'}} alignment='center' >
                <Link to={'/contracts'} >
                  <Button variant="contained" fullWidth color="primary" startIcon={<ArrowBack />} >
                    Retour
                  </Button>
                </Link>
                <Typography variant="h5" component="h2" align="center" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Contract n° {contract.contractId}
                </Typography>
                <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Client's Details
                </Typography>
                <Grid container 
                columnSpacing={2}
                alignItems="center"
                justifyContent="left"
                paddingLeft={2}
                paddingBottom={2}
                spacing={1}
                >
                  <Grid item container xs={5}
                  columnSpacing={1}
                  rowSpacing={2}
                  justifyContent='left'
                  >
                    <Grid item xs='auto' >
                      <Typography variant="h6" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                        Client id :
                      </Typography>
                    </Grid>
                    <Grid item xs='auto' >
                      <TextField
                      name="clientId"
                      label="Client id"
                      value={editableData.clientId || ''}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      sx={{width: 'auto'}}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Technical characteristics
                </Typography>
                <Grid container
                spacing={2}
                columnSpacing={2}
                alignItems="center"
                justifyContent="left"
                paddingLeft={4}
                paddingBottom={2}
                >
                  <Grid item xs={12} >
                    <Typography variant="h6" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                      { }
                    </Typography>
                  </Grid>
                  <Grid item xs='auto' >
                    <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                      Furniture Number (EAN) :
                    </Typography>
                  </Grid>
                  <Grid item xs='auto' >
                    <TextField
                    name="meter"
                    label="EAN"
                    value={editableData.ean || ''}
                    size='small'
                    onChange={handleEditableDataChange}
                    disabled={!editMode}
                    />
                  </Grid>
                  <Grid item xs={2} >
                  </Grid>
                  <Grid item container xs='auto'
                  columnSpacing={1}
                  >
                    <Grid item xs='auto' >
                      <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                        Begin Date :
                      </Typography>
                    </Grid>
                    <Grid item xs='auto' >
                      <TextField
                      name="beginDate"
                      label="Begin Date"
                      value={editableData.beginDate}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      sx={{width: '110px'}}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs='auto'
                  columnSpacing={1}
                  >
                    <Grid item xs='auto' >
                      <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                        End Date :
                      </Typography>
                    </Grid>
                    <Grid item xs='auto' >
                      <TextField
                      name="endDate"
                      label="End Date"
                      value={editableData.endDate}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      sx={{width: '110px'}}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                  Client's offer
                </Typography>
                <Grid >
                  <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    Subscribed to the offer #{} of XX€/month for YY.
                  </Typography>
                </Grid>
              </Box>
            </Card>
            {editMode ? (
              <Grid container
              direction='row'
              justifyContent='center'
              alignItems='center'
              >
                <Grid item xs={6} >
                  <Button  variant='outlined' color='secondary' onClick={handleEditClick} sx={{mt:2, width:'60%', mb:5}}>
                      Cancel Changes
                  </Button>             
                </Grid>
                <Grid item xs={6} >
                  <Button  variant='outlined' color='error' onClick={handleSaveClick} sx={{mt:2, width:'80%', mb:5}}>
                    Confirm Changes
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container
              direction='row'
              justifyContent='center'
              alignItems='center'
              >
                <Grid item xs={6} >
                  <Button  variant='outlined' color='secondary' onClick={handleEditClick} sx={{mt:2, width:'60%', mb:5}}>
                    Edit Contract
                  </Button>
                </Grid>
                <Grid item xs={6} >
                  <Button  variant='outlined' color='error' onClick={handleCancelContract} sx={{mt:2, width:'80%', mb:5}}>
                    Cancel Contract
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ViewContract;