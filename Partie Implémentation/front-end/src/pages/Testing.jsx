import React from 'react'
import SideMenu from '../pagesStaff/SideMenu'
import {Button, Card, Grid, List, ListItem, ListItemText, Stack, Typography, Box, TextField} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import TopMenu from '../components/TopMenu';
import { ClientList as Clients, ContractList as Contracts} from '../resources/Lists';
import { useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

function ViewContract() {
  const id = 9172;

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

  const pageAddress = "/test";
  const pageName = "View Contract";

  const getContractById = (id) => {
    const idInt = parseInt(id,10);
    return Contracts.find((contract) => contract.contractID === idInt);
  };
  
  function getClientByContractId(id) {
    const idInt = parseInt(id,10);
    const owner = Contracts.find((contract) => contract.contractID === idInt).owner;
    const ownerID = parseInt(owner,10);
    return Clients.find((client) => client.clientID === ownerID);
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
    return client.clientID;
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
  const getSubPrice = () => {
    return contract.subPrice;
  }
  const getSupplier = () => {
    return contract.supplier;
  }
  const getContractBeginDate = () => {
    return contract.beginDate;
  }
  const getContractEndDate = () => {
    return contract.endDate;
  }

  const contractData = {
    clientID: getClientId(),
    clientName: getClientName(),
    clientEmail: getClientEmail(),
    clientPhone: getClientPhone(),
    consumptionAddress: getConsAddress(),
    contractType: getConsType(),
    meter: getMeters(),
    subPrice: getSubPrice(),
    supplier: getSupplier(),
    beginDate: getContractBeginDate(),
    endDate: getContractEndDate(),
  }
  const [editMode, setEditMode] = React.useState(false);
  const [editableData, setEditableData] = React.useState(contractData);

  const handleEditClick = () => {
    setEditMode(true);
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
  }

  const handleCancelContract = () => {
    alert("Contract cancelled");
  }

  return (

    <ThemeProvider theme={theme}>
    <Card sx={{display: 'flex', height: 'auto'}}>
      <Stack>
      <Card sx={{display: 'flex', height: 'auto'}}>
        
        <Grid container
        >
          <Grid item container xs='auto' direction="row" alignItems="center" justifyContent="center" 
          >
            <Grid item xs='auto' >
              <Typography variant="h6" component="h2" align="left" sx={{paddingLeft: '4px', paddingTop: '4px'}} >
                Client id :
              </Typography>
            </Grid>
            <Grid item xs='auto' >
              <TextField
              name="clientid"
              label="Client id"
              value={editableData.clientID}
              size='small'
              onChange={handleEditableDataChange}
              disabled={!editMode}
              />
            </Grid>

          </Grid>
        </Grid>

      </Card>
      <Card sx={{display: 'flex', height: '100vh'}}>

      </Card>
      <Card sx={{display: 'flex', height: 'auto'}}>

      </Card>
      </Stack>
    </Card>
    </ThemeProvider>
  );
}

export default ViewContract;