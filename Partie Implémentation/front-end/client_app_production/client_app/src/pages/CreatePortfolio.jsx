import {React, useState, useEffect, useRef} from 'react'
import SideMenu from '../components/SideMenu';
import {Stack,Card, Dialog, DialogContent, DialogTitle, DialogContentText, InputLabel, Select,MenuItem,  DialogActions, Box, Grid, Button, TextField, ThemeProvider, createTheme, styled, IconButton, FormControl, Snackbar, Alert} from '@mui/material';
import logo from '../resources/logo.png';
import AccountMenu from '../components/AccountMenu';
import TopMenu from '../components/TopMenu';
import {Link, useNavigate} from 'react-router-dom';
import axios from '../api/axios';
import { useTranslation } from 'react-i18next';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

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

const URL = "http://localhost:8080/api/portfolio";


const CreatePortfolio = () => {
  const {t} = useTranslation();
  const pageAddress = "/create-portfolio";
  const pageName = t('create_portfolio');

  const [energyType, setEnergyType] = useState("");

  const [data, setData] = useState({
    name : "",
    supply_point : "", 
    supplier : "", 
    address : {
      city : "",
      street : "", 
      houseNo : "", 
      box : "", 
      postalCode : "", 
      country : "",
      region : ""
    }, 
    contract_type : ""
  });

  // The state of the dialog popup
  /*const [openSupply, setOpenSupply] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [openContract, setOpenContract] = useState(false);*/

  let address = {
    street_number : "",
    street_name : "",
    city : "",
    province : "",
    region : "",
    country : "",
    postal_code : "",
  }
  const autoCompleteRef = useRef(); 
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "be" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"]
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log(place);
      address = { 
      street_number : "",
      street_name : "",
      city : "",
      province : "",
      region : "",
      country : "",
      postal_code : "",}
      place.address_components.forEach(function(c){
        switch(c.types[0]){
          case 'street_number':
            address.street_number = c.long_name;
            data.address.houseNo = c.long_name; 
            break; 
          case 'route':
            address.street_name = c.long_name; 
            data.address.street = c.long_name; 
            break; 
          case 'locality':
            address.city = c.long_name; 
            data.address.city = c.long_name; 
            break;
          case 'administrative_area_level_2':
            address.province = c.long_name;
            break;
          case 'administrative_area_level_1':
            address.region  = c.long_name; 
            data.address.region = c.long_name; 
            break; 
          case 'postal_code':
            address.postal_code = c.long_name; 
            data.address.postalCode = c.long_name;
            break;
          case 'country' :
            address.country = c.long_name; 
            data.address.country = c.long_name; 
            break;
        }
      })
      console.log(address);
     });
    }, []);


  

  const onUpdateField=e=>{
    e.preventDefault();
    const field = e.target.name; 
    const nextDataState= {
      ...data, 
      [field] : e.target.value,
    };
    setData(nextDataState);
  };

  /*const handleSupplyCancel = () => {
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
  }*/

  

  /*const handleSelect = (e) => {
    const{value} = e.target; 
    data.contract_type=value; 
    setEnergyType(value);
  }*/

  const navigate = useNavigate();

 

  const onSubmitForm = async e => {
    e.preventDefault();
    console.log(data);
    const body =  {
      name : data.name,
      address : data.address.street + " " + data.address.houseNo + " " +data.address.box + " " +data.address.postalCode + " " +data.address.city + " " +data.address.region + " " +data.address.country,
    }
    const jwt = localStorage.getItem("jwt");
    try {
      const response = axios.post(URL, JSON.stringify(body), {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        creationSuccess();
        delay(1000).then(()=>{
          console.log("Portfolio Created"); 
          console.log(response.data);
          creationSuccess();
          setSuccess(false);
          navigate("/manage-portfolios");
        })
      }) 
    } catch(err){
      console.log("Unexpected error occured.");
    }
    
  }

  const [success, setSuccess] = useState(false);

  function creationSuccess() {
    setSuccess(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return; 
    }

    setSuccess(false);
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
              
              <CssTextField name="name" label={t('portfolio_name')} sx={{m:2, mt:5}} onChange={onUpdateField}/>
              
              
              <CssTextField variant='outlined' 
                  label={t('address')} 
                  margin='normal'
                  name='address' 
                  value={address.street} 
                  inputRef={inputRef}
                  sx={{m:2}}/>
              
              
            </Stack>
          </Card>
          <ThemeProvider theme={theme}>    
              <Button type="submit" variant='outlined' color='secondary' sx={{mt:2, width:'100%', mb:5}}>
                {t('create_portfolio')}
              </Button>
          </ThemeProvider>
          <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>{t('portfolio_success')}</Alert>
          </Snackbar>
          </Stack>
          </Box>
          </form>
        </Grid>
      </Stack>
      
    </Stack>
  )
}

export default CreatePortfolio