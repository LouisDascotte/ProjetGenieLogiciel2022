import {React, useRef, useEffect, useState} from 'react'
import axios from "../api/axios";
import {Stack, TextField, Box, Typography, Button, IconButton, FormControl, MenuItem, Select, InputLabel, InputAdornment} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ContractRequest = () => {
  const pageAddress = "/contract-request";
  const pageName = "Contract request";
  const navigate = useNavigate();
  const autoCompleteRef = useRef(); 
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "be" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"]
  };

  const [address, setAddress] = useState({
    street_number : "",
    street_name : "",
    city : "",
    province : "",
    region : "",
    country : "",
    postal_code : "",
  });

  const jwt = localStorage.getItem("jwt");

  const [ean1, setEan1] = useState("");
  const [ean2, setEan2] = useState("");
  const [contractType, setContractType] = useState("");
  const [meterType, setMeterType] = useState("");

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      place.address_components.forEach(function(c){
        switch(c.types[0]){
          case 'street_number':
            address.street_number = c.long_name;
            //form.address.houseNo = c.long_name; 
            break; 
          case 'route':
            address.street_name = c.long_name; 
            //form.address.street = c.long_name; 
            break; 
          case 'locality':
            address.city = c.long_name; 
            //form.address.city = c.long_name; 
            break;
          case 'administrative_area_level_2':
            address.province = c.long_name;
            break;
          case 'administrative_area_level_1':
            address.region  = c.long_name; 
            //form.address.region = c.long_name; 
            break; 
          case 'postal_code':
            address.postal_code = c.long_name; 
            //form.address.postalCode = c.long_name;
            break;
          case 'country' :
            address.country = c.long_name; 
            //form.address.country = c.long_name; 
            break;
        }
      })
      console.log(address);
     });
  }, []);

  const handleSelectChangeContractType = (e) => {
    setContractType(e.target.value);
  }

  const handleSelectChangeType = (e) => {
    setMeterType(e.target.value);
  }

  const [meterFuncType, setMeterFuncType] = useState("");

  const handleSelectChangeMeterType = (e) => {
    setMeterFuncType(e.target.value);
  }

  function cancel(){

  }

  let body = {};

  function confirmRequest(){
    const contractTypesList = ["ELEC", "GAZ", "WATER", "ELECTRICITY_AND_GAS"];
    const meter_type = ["SIMPLE", "DOUBLE"]
    const mechanism = ["NUMERIC", "MANUAL"]
    if (contractType ===4){
      body = {
        "address" : address.street_name + " " + address.street_number + ", " + address.city + ", " + address.postal_code + ", " + address.country,
        "energyType" : contractTypesList[contractType-1],
        "hourType" : meter_type[meterType-1],
        "EAN_GAZ" : ean1,
        "EAN_ELEC" : ean2
      }
    } else {
      body = {
        "address" : address.street_name + " " + address.street_number + ", " + address.city + ", " + address.postal_code + ", " + address.country,
        "energyType" : contractTypesList[contractType-1],
        "hourType" : meter_type[meterType-1],
        "EAN" : ean1,
        "meterType" : mechanism[meterFuncType-1],
      }
    }
    console.log(body);
    navigate("/offers-page", {state: {body: body}})
  }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems={'center'}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <IconButton onClick={() => navigate(-1)} sx={{mt:2}}>
          <ArrowBackIcon/>
        </IconButton>
        <Box sx={{backgroundColor:"white", borderRadius:"16px", width:'90%', mt:2}}>
          <Stack alignItems='center' justifyContent={"center"} sx={{m:4}}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"}>
              <Typography variant='h6' sx={{mr:8}}>Client's name : </Typography>
              <Typography variant='h6' >Godwill Louhou</Typography>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:8}}>Address of the property : </Typography>
              <Stack>
                <TextField inputRef={inputRef}/>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}}>Contract type : </Typography>
              <FormControl sx={{minWidth:"100%"}}>
                <InputLabel>Select contract type</InputLabel>
                <Select sx={{width:"100%"}} label='Select contract type' onChange={handleSelectChangeContractType}>
                  <MenuItem value={1}>Electricity</MenuItem>
                  <MenuItem value={2}>Gas</MenuItem>
                  <MenuItem value={3}>Water</MenuItem>
                  <MenuItem value={4}>Gas/Electricity</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {contractType !== 4 ? <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}}>Supply point : </Typography>
              <TextField type='number' onChange={e => setEan1(e.target.value)}  onkeydown="return event.keyCode !== 69" InputProps={{
            startAdornment: <InputAdornment position="start">EAN</InputAdornment>,
          }}/>
            </Stack> : <Stack><Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}} onChange={e=>setEan1(e.target.value)}>Gas supply point : </Typography>
              <TextField type='number'  onkeydown="return event.keyCode !== 69" InputProps={{
            startAdornment: <InputAdornment position="start">EAN</InputAdornment>,
          }}/>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}} onChange={e=>setEan2(e.target.value)}>Electricity supply point : </Typography>
              <TextField type='number'InputProps={{
            startAdornment: <InputAdornment position="start">EAN</InputAdornment>,
          }}/>
            </Stack></Stack>}
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}}>Hour type: </Typography>
              <FormControl sx={{minWidth:"100%"}}>
                <InputLabel>Select hour type:</InputLabel>
                <Select sx={{width:"100%"}} label='Select hour type:' onChange={handleSelectChangeType}>
                  <MenuItem value={1}>Mono-hourly</MenuItem>
                  <MenuItem value={2}>Bi-hourly</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}}>Meter type : </Typography>
              <FormControl sx={{minWidth:"100%"}}>
                <InputLabel>Select meter type :</InputLabel>
                <Select sx={{width:"100%"}} label='Select meter type :' onChange={handleSelectChangeMeterType}>
                  <MenuItem value={1}>Electronic</MenuItem>
                  <MenuItem value={2}>Mechanical</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Button size='large' variant='outlined' sx={{mr:8}} onClick={cancel}>
                Cancel
              </Button>
              
              <Button size='large' variant='outlined' onClick={confirmRequest}>
                Confirm
              </Button>
              
            </Stack>
          </Stack>
        </Box>
        
      </Stack>
    </Stack>
  )
}

export default ContractRequest