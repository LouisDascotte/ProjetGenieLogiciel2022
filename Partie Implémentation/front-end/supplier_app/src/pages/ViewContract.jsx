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
  const jwt = localStorage.getItem('token');

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
    elecEan: contract.ean_ELEC,
    gasEan: contract.ean_GAZ
  }

  const [editMode, setEditMode] = React.useState(false);
  const [editableData, setEditableData] = React.useState(contractData);

  const handleEditClick = () => {
    setEditMode(!editMode);
    setEditableData(contractData);
  }
  const handleUnlinkMeter = async () => {
    console.log(contract.type);
    switch (contract.type) {
      case "GAZ_ELEC_CONTRACT":
        await axios.put(`http://localhost:8080/api/meter/${contract.ean_ELEC}/unlink`, null, {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
          params: {
            clientId: contract.clientId
          }
        })
        .then((response) => {
          console.log(response);
        }
        )
        .catch((error) => {
          console.log(error);
        }
        )
        await axios.put(`http://localhost:8080/api/meter/${contract.ean_GAZ}/unlink`, {
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": true,
          },
          params: {
            clientId: contract.clientId
          }
        })
        .then((response) => {
          console.log(response);
        }
        )
        .catch((error) => {
          console.log(error);
        }
        )
        break;
        default:
          console.log("been there");
          await axios.put(`http://localhost:8080/api/meter/${contract.ean}/unlink`, null, {
            headers: {
              "Authorization": `Bearer ${jwt}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            }
          })
          .then((response) => {
            console.log(response);
          }
          )
          .catch((error) => {
            console.log(error);
          }
          )
          break;
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
    const jwt = localStorage.getItem("jwt");
    axios.delete(`http://localhost:8080/api/contract/${contract.id}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
      }
    })
    .then((response) => {
      console.log(response);
    }
    )
    .catch((error) => {
      console.log(error);
    }
    )
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
                  Contract #{contract.id}
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
                      <Typography variant="h6" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} fontWeight={800} >
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

                <Grid item>
                  <Typography variant="h6" component="h2" align="left" fontWeight={800} sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                    Technical characteristics
                  </Typography>
                </Grid>
                
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
                  {contract.type ==='GAZ_ELEC_CONTRACT' ?
                  <Grid item container xs={12}
                  columnSpacing={1}
                  rowSpacing={2}
                  justifyContent='left'
                  >
                    <Grid item container xs={6}
                    columnSpacing={1}
                    >
                      <Grid item xs='auto' >
                        <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                          Elec Meter EAN :
                        </Typography>
                      </Grid>
                      <Grid item xs='auto' >
                        <TextField
                        name="elecMeter"
                        label="Elec Meter EAN"
                        value={editableData.elecEan || ''}
                        size='small'
                        onChange={handleEditableDataChange}
                        disabled={!editMode}
                        />
                      </Grid>
                      <Grid item xs={2} >
                      </Grid>
                    </Grid>
                    <Grid item container xs={6}
                    columnSpacing={1}
                    >
                      <Grid item xs='auto' >
                        <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                          Gas Meter EAN : 
                        </Typography>
                      </Grid>
                      <Grid item xs='auto' >
                        <TextField
                        name="gasMeter"
                        label="Gas Meter EAN"
                        value={editableData.gasEan || ''}
                        size='small'
                        onChange={handleEditableDataChange}
                        disabled={!editMode}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  :
                  <Grid item container xs={12}
                  columnSpacing={1}
                  rowSpacing={2}
                  justifyContent='left'
                  >
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
                  </Grid>
                  }
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
                  <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px', paddingBottom: '4px'}} >
                    Subscribed to the offer #{contract.offerId}
                  </Typography>
                </Grid>
              </Box>
            </Card>
            <Grid item xs={6} >
              <Button  variant='outlined' color='primary' onClick={handleUnlinkMeter} sx={{mt:2, width:'80%', mb:5}}>
                Unlink meter(s)
              </Button>
            </Grid>
            <Grid item xs={6} >
              <Button  variant='outlined' color='error' onClick={handleCancelContract} sx={{mt:2, width:'80%', mb:5}}>
                Cancel Contract
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default ViewContract;