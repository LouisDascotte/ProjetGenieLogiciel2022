import {React, useState} from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Dialog, DialogContent, DialogTitle, DialogContentText, InputLabel, Select,MenuItem,  DialogActions, Box, Grid, Button, TextField, ThemeProvider, createTheme, styled, IconButton, FormControl} from '@mui/material';
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

const URL = "http://localhost:8080/portfolio";


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


  const [energyType, setEnergyType] = useState("");

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
    setOpenSupply(false)
  }

  const handleSupplierCancel= () => {
    data.supplier = "";
    setOpenSupplier(false);
  }

  const handleAddressCancel = () => {
    data.address = "";
    setOpenAddress(false);
  }

  const handleContractCancel = () => {
    data.contract_type = "";
    setOpenContract(false);
  }

  

  const handleSelect = (e) => {
    const{value} = e.target; 
    data.contract_type=value; 
    setEnergyType(value);
  }

  const onSubmitForm = e => {
    e.preventDefault();
    console.log(data);
    console.log("working");
    const jwt = localStorage.getItem("jwt");
    try {
      const response = axios.post(URL + "/create", JSON.stringify(data), {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        console.log("Portfolio Created"); 
        console.log(response.data);
      }) 
    } catch(err){
      console.log("Unexpected error occured.");
    }
    
  }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        
        <Grid align='center'>
          <form onSubmit={onSubmitForm}>
          <Box width='100%'>
          <Stack alignContent="center" alignItems='center' justifyContent="center" sx={{width:'40%'}}>
          <Card sx={{width:'100%', m:2, mt:5}}>
            <Stack sx={{width:'95%'}}>
              
              <CssTextField name="portfolio_name" label="Enter a name for your portfolio" sx={{m:2, mt:5}} onChange={onUpdateField}/>
              <Button variant="outlined" size="large" sx={{m:2, color:"#9acd6c", borderBlockColor:'#9acd6c'}} onClick={()=>setOpenSupply(true)}>{ (data.supply_point === "") ? "Add a supply point" : data.supply_point}</Button>
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
              <Button onClick={()=>setOpenSupplier(true)} variant="outlined" size="large" sx={{m:2, color:"#9acd6c", borderBlockColor:'#9acd6c'}}>{ (data.supplier === "") ? "Add a supplier" : data.supplier}</Button>
              <Dialog open={openSupplier} onClose={()=>setOpenSupplier(false)}>
                <DialogTitle>Add a supplier</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add the supplier. 
                  </DialogContentText>
                  <CssTextField name="supplier" value={data.supplier} label="Enter the supplier's name" sx={{width:'100%', mt:1}} onChange={onUpdateField}/>
                  <Stack direction='row' justifyContent={"center"} alignContent={"space-evenly"} sx={{mt:1}}>
                    <Button sx={{color:"#000", mr:5}} onClick={handleSupplierCancel}>Cancel</Button>
                    <Button sx={{color:"#9acd6c"}} onClick={() => setOpenSupplier(false)}>Confirm</Button>   
                  </Stack>
                </DialogContent>
              </Dialog>
              <Button variant="outlined" size="large" sx={{m:2, color:"#9acd6c", borderBlockColor:'#9acd6c'}} onClick={()=>setOpenAddress(true)}>{ (data.address === "") ? "Add an address" : data.address}</Button>
              <Dialog open={openAddress} onClose={()=>setOpenAddress(false)}>
                <DialogTitle>Add an address</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add the address. 
                  </DialogContentText>
                  <CssTextField name="address" value={data.address} label="Enter the address" sx={{width:'100%', mt:1}} onChange={onUpdateField}/>
                  <Stack direction='row' justifyContent={"center"} alignContent={"space-evenly"} sx={{mt:1}}>
                    <Button sx={{color:"#000", mr:5}} onClick={handleAddressCancel}>Cancel</Button>
                    <Button sx={{color:"#9acd6c"}} onClick={() => setOpenAddress(false)}>Confirm</Button>   
                  </Stack>
                </DialogContent>
              </Dialog>
              <Button variant="outlined" size="large" sx={{m:2, mb:5, color:"#9acd6c", borderBlockColor:'#9acd6c'}} onClick={()=>setOpenContract(true)}>{ (data.contract_type === "") ? "Add a contract type" : data.contract_type}</Button>
              <Dialog open={openContract} onClose={()=>setOpenContract(false)}>
                <DialogTitle>Add a contract type.</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Add the contract type. 
                  </DialogContentText>

                  <FormControl fullWidth size="small" margin="normal">
                    <InputLabel margin="normal" id="select-energy-label">Energy type :</InputLabel>
                    <Select
                      labelId="portfolio-select-label"
                      id="portfolio-select"
                      value={data.contract_type}
                      label="Energy :"
                      onChange={handleSelect}
                      >
                        <MenuItem value={"gas"}>Gas</MenuItem>
                        <MenuItem value={"elec"}>Electricity</MenuItem>
                        <MenuItem value={"gaselec"}>Gas + Electricity</MenuItem>                    
                    </Select>
                  </FormControl>   


                  <Stack direction='row' justifyContent={"center"} alignContent={"space-evenly"} sx={{mt:1}}>
                    <Button sx={{color:"#000", mr:5}} onClick={handleContractCancel}>Cancel</Button>
                    <Button sx={{color:"#9acd6c"}} onClick={() => setOpenContract(false)}>Confirm</Button>   
                  </Stack>
                </DialogContent>
              </Dialog>
            </Stack>
          </Card>
          <ThemeProvider theme={theme}>    
              <Button type="submit" variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                Create portfolio
              </Button>
          </ThemeProvider>
          </Stack>
          </Box>
          </form>
        </Grid>
      </Stack>
    </Stack>
  )
}

export default CreatePortfolio