import {React, useState} from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Box, Grid, Button, TextField, ThemeProvider, createTheme, styled, IconButton} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import TempList from '../components/TempList';
import ElementsList from '../components/ElementsList';
import {Link} from 'react-router-dom';
import axios from '../api/axios';


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

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#9acd6c',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#9acd6c',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#9acd6c',
    },
  },
});


const CreatePortfolio = () => {
  const pageAddress = "/create-portfolio";
  const pageName = "Create portfolio";

  // The name of the portfolio
  /*const [portfolioName, setPortfolioName] = useState("");
  const [supplyPoint, setSupplyPoint] = useState("");
  const [supplier, setSupplier] = useState("");
  const [address, setAddress] = useState("");
  const [contractType, setContractType] = useState("");*/

  // The state of the dialog popup
  const [openSupply, setOpenSupply] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openContract, setOpenContract] = useState(false);


  let [data, setData] = useState({
    portfolio_name : "",
    supply_point : "", 
    supplier : "", 
    address : "", 
    contract_type : ""
  });

  const onUpdateField=e=>{
    e.preventDefault();
    const field = e.target.name; 
    const nextDataState= {
      ...data, 
      [field] : e.target.value,
    };
    setData(nextDataState);
  };

  const handleSupplyCancel = () => {
    data.supply_point = "";
    setOpenSupply(false);
  }

  const onSubmitForm = e => {
    e.preventDefault();
    console.log(data);
    console.log("working");
  }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        
        <Grid align='center'>
        <form onSubmit={onSubmitForm} align="center">
          <Box width='100%'>

          <Card sx={{width:'40%', m:2, mt:5}}>
            <Stack sx={{width:'95%'}}>
              
              <CssTextField name="portfolio_name" label="Enter a name for your portfolio" sx={{m:2, mt:5}} onChange={onUpdateField}/>
              <Button variant="outlined" size="large" sx={{m:2, color:"#9acd6c", borderBlockColor:'#9acd6c'}} onClick={()=>setOpenSupply(true)}>Add a supply point</Button>
              <Dialog open={openSupply} onClose={()=>setOpenSupply(false)}>
                <DialogTitle>Add a supply point</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add the supply point of your portfolio. 
                  </DialogContentText>
                  <CssTextField name="supply_point" value={data.supply_point} label="Enter the supply point EAN" sx={{width:'100%', mt:1}} onChange={onUpdateField}/>
                  <Stack direction='row' justifyContent={"center"} alignContent={"space-evenly"} sx={{mt:1}}>
                    <Button sx={{color:"#000", mr:5}} onClick={handleSupplyCancel}>Cancel</Button>
                    <Button sx={{color:"#9acd6c"}} onClick={() => setOpenSupply(false)}>Confirm</Button>   
                  </Stack>
                </DialogContent>
              </Dialog>
              <Button variant="outlined" size="large" sx={{m:2, color:"#9acd6c", borderBlockColor:'#9acd6c'}}>Add a supplier</Button>
              <Button variant="outlined" size="large" sx={{m:2, color:"#9acd6c", borderBlockColor:'#9acd6c'}}>Add an address</Button>
              <Button variant="outlined" size="large" sx={{m:2, mb:5, color:"#9acd6c", borderBlockColor:'#9acd6c'}}>Add a contract type</Button>
            </Stack>
          </Card>
          <ThemeProvider theme={theme}>    
              <Button type="submit" variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                Create portfolio
              </Button>
          </ThemeProvider>

          </Box>
          </form>
        </Grid>
      </Stack>

    </Stack>
  )
}

export default CreatePortfolio