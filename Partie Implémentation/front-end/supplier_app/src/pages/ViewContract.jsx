import React from 'react'
import SideMenu from '../components/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, TextField} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients, ContractList as Contracts} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

function ViewContract() {
  const id = useParams().contractId;

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

  const pageAddress = "/contracts/:id";
  const pageName = "View Contract";

  const getContractById = (id) => {
    const idInt = parseInt(id,10);
    return Contracts.find((contract) => contract.contractId === idInt);
  };
  
  function getClientByContractId(id) {
    const idInt = parseInt(id,10);
    const owner = Contracts.find((contract) => contract.contractId === idInt).clientId;
    const ownerId = parseInt(owner,10);
    return Clients.find((client) => client.clientId === ownerId);
  }

  const contract = getContractById(id);
  const client = getClientByContractId(id);

  const getClientName = () => {
    return client.name;
  }
  const getClientEmail = () => {
    return client.email;
  }
  const getClientId = () => {
    return client.clientId;
  }
  const getClientPhone = () => {
    return client.phone;
  }

  const getConsAddress = () => {
    return contract.consumptionAddress;
  }
  const getConsType = () => {
    return contract.contractType;
  }
  const getMeters = () => { 
    const meterNbr = contract.meter.length;
    let meters;
    switch (meterNbr) {
      default:
      case 1:
        return contract.meter[0];
      case 2:
        return meters = {meter1: contract.meter[0], meter2: contract.meter[1]};
    }
  }
  const getOffer = () => {
    return contract.offer;
  }
  const getSupplier = () => {
    return contract.supplierId;
  }
  const getContractBeginDate = () => {
    return contract.beginDate;
  }
  const getContractEndDate = () => {
    return contract.endDate;
  }

  const contractData = {
    clientId: getClientId(),
    clientName: getClientName(),
    clientEmail: getClientEmail(),
    clientPhone: getClientPhone(),
    consumptionAddress: getConsAddress(),
    contractType: getConsType(),
    meter: getMeters(),
    offer: getOffer(),
    supplier: getSupplier(),
    beginDate: getContractBeginDate(),
    endDate: getContractEndDate(),
  }
  const [editMode, setEditMode] = React.useState(false);
  const [editableData, setEditableData] = React.useState(contractData);

  const handleEditClick = () => {
    setEditMode(!editMode);
    setEditableData(contractData);
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
    alert('DELETE request sent to server ');
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
                      value={editableData.clientId}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      sx={{width: '150px'}}
                      />
                    </Grid>
                    <Grid item xs={12} >
                      <TextField
                      name="clientName"
                      label="Client name"
                      value={editableData.clientName}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={7}
                  columnSpacing={1}
                  rowSpacing={2}
                  justifyContent='left'
                  >
                    <Grid item xs='auto' >
                      <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                        Email:
                      </Typography>
                    </Grid>
                    <Grid item xs='auto' >
                      <TextField
                      name="clientEmail"
                      label="Client email"
                      value={editableData.clientEmail}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      />
                    </Grid>
                    <Box sx={{width:'100%', height:'10px'}} />
                    <Grid item xs='auto' >
                      <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                        Phone:
                      </Typography>
                    </Grid>
                    <Grid item xs='auto' >
                      <TextField
                      name="clientPhone"
                      label="Client phone"
                      value={editableData.clientPhone}
                      size='small'
                      onChange={handleEditableDataChange}
                      disabled={!editMode}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} >
                    <Typography variant="body1" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                      Consumption address
                    </Typography>
                  </Grid>
                  <Grid item xs={12}
                  justifyContent='left'
                  >
                    <TextField
                    name="consumptionAddress"
                    label="Consumption address"
                    value={editableData.consumptionAddress}
                    onChange={handleEditableDataChange}
                    size='small'
                    disabled={!editMode}
                    sx={{width:'80%'}}
                    />
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
                      {getConsType()}
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
                    value={editableData.meter}
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
                    Subscribed to the base offer of {getOffer()}€/month for {getConsType().toLocaleLowerCase()} to {getSupplier()}.
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