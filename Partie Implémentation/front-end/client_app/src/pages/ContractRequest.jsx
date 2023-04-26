import {React, useRef, useEffect, useState} from 'react'
import axios from "../api/axios";
import {Stack, TextField, Box, Typography, Button, IconButton, FormControl, MenuItem, Select, InputLabel, InputAdornment, Alert, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';

const ContractRequest = () => {
  const {t} = useTranslation();
  const pageAddress = "/contract-request";
  const pageName = t('contract_request');
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

  const [energyType, setEnergyType] = useState("");

  const [meterType1, setMeterType] = useState("");
  const [meterType2, setMeterType2] = useState("");

  const [meterHourType1, setMeterHourType] = useState("");
  const [meterHourType2, setMeterHourType2] = useState("");

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

  const selectEnergyType = (e) => {
    setEnergyType(e.target.value);
  }

  const selectMeterType1 = (e) => {
    setMeterType(e.target.value);
  }

  const selectMeterHour1 = (e) => {
    setMeterHourType(e.target.value);
  }

  const [ean1Error, setEan1Error] = useState(false);
  const [ean2Error, setEan2Error] = useState(false);

  const setEan1Value = (e) => {
    const reg = new RegExp(/^\d{18}$/);
    if (reg.test(e.target.value)){
      setEan1(e.target.value);
      setEan1Error(false);
    } else {
      setEan1("");
      setEan1Error(true);
    }
  }

  const setEan2Value = (e) => {
    const reg = new RegExp(/^\d{18}$/);
    if (reg.test(e.target.value)){
      setEan2(e.target.value);
      setEan2Error(false);
    } else {
      setEan2("");
      setEan2Error(true);
    }
  }


  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  function cancel(){
    navigate(-1);
  }

  let body = {};

  function confirmRequest(){
    const contractTypesList = ["ELEC", "GAZ", "WATER", "ELECTRICITY_AND_GAS"];
    const meter_type = ["SIMPLE", "DOUBLE"]
    const mechanism = ["NUMERIC", "MANUAL"]
    if (energyType === 4 && ean1Error === false && address.street_number !== "" && ean2Error === false && ean1 !== ean2 && ean1 !== "" && ean2 !== "" && meter_type[meterHourType1-1] !== undefined && contractTypesList[energyType-1] !== undefined && address.street_name !== "" && mechanism[meterType1-1] !== undefined ){
      body = {
        "address" : address.street_name + " " + address.street_number + ", " + address.city + ", " + address.postal_code + ", " + address.country,
        "energyType" : contractTypesList[energyType-1],
        "hourType" : meter_type[meterHourType1-1],
        "EAN_GAZ" : ean1,
        "EAN_ELEC" : ean2,
        "meterType": mechanism[meterType1-1],
      }
    } else if (energyType !== 4 && ean1Error === false && ean1 !== "" && address.street_number !== "" && meter_type[meterHourType1-1] !== undefined && contractTypesList[energyType-1] !== undefined && address.street_name !== "" && mechanism[meterType1-1] !== undefined){
      body = {
        "address" : address.street_name + " " + address.street_number + ", " + address.city + ", " + address.postal_code + ", " + address.country,
        "energyType" : contractTypesList[energyType-1],
        "hourType" : meter_type[meterHourType1-1],
        "EAN" : ean1,
        "meterType" : mechanism[meterType1-1],
      }
    } else {
      if (address.street_number === ""){
        setErrorMsg(t('error.street_number'));
      } else {
        setErrorMsg(t('error.check_form'));
      }
      setOpenError(true);
      return; 
    }
    navigate("/offers-page", {state: {body: body}})
  }

  const handleKeyDown = (event) => {
    if (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-' || event.key === '.' || event.key === ',') {
      event.preventDefault();
    }
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
              <Typography variant='h6' sx={{mr:8}}>{t('client_name')} : </Typography>
              <Typography variant='h6' >{localStorage.getItem("firstName")  +" " +localStorage.getItem("lastName") }</Typography>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:8}}>{t('property_address')} : </Typography>
              <Stack>
                <TextField inputRef={inputRef}/>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}} style={{whiteSpace:"nowrap"}}>{t('contract_type')} : </Typography>
              <FormControl sx={{minWidth:"100%"}}>
                <InputLabel style={{whiteSpace:'nowrap'}}>{t('select_contract_type')}</InputLabel>
                <Select sx={{width:"100%"}} label={t('select_contract_type')} onChange={selectEnergyType}>
                  <MenuItem value={1}>{t('elec')}</MenuItem>
                  <MenuItem value={2}>{t('gas')}</MenuItem>
                  <MenuItem value={3}>{t('water')}</MenuItem>
                  <MenuItem value={4}>{t('gas_elec')}</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            {energyType !== 4 ? <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}}>{t('meter')} EAN : </Typography>
              <TextField type='number' onChange={setEan1Value}  onKeyDown={handleKeyDown} InputProps={{
            startAdornment: <InputAdornment position="start">EAN</InputAdornment>,
          }}/>
          {ean1Error ? <Alert sx={{ml: 2}}severity="error">{t('ean_length')}</Alert> : null}
            </Stack> : <Stack>
              <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}}>{t('gas_meter')} : </Typography>
              <TextField onChange={setEan1Value} type='number'  onKeyDown={handleKeyDown} InputProps={{
            startAdornment: <InputAdornment position="start">EAN</InputAdornment>,
          }}/>
          {ean1Error ? <Alert sx={{ml: 2}}severity="error">{t('ean_length')}</Alert> : null}
            </Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Typography variant='h6' sx={{mr:5}} > {t('elec_meter')} : </Typography>
              <TextField onChange={setEan2Value} onKeyDown={handleKeyDown} type='number'InputProps={{
            startAdornment: <InputAdornment position="start">EAN</InputAdornment>,
          }}/>
          {ean2Error ? <Alert sx={{ml: 2}}severity="error">{t('ean_length')}</Alert> : null}
            </Stack></Stack>}
            {energyType !== 4 ? <Stack>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
            <Typography variant='h6' sx={{mr:5}}style={{whiteSpace:'nowrap'}}> {t('hour_type')} </Typography>
            <FormControl sx={{minWidth:"100%"}}>
              <InputLabel> {t('select_hour_type')} :</InputLabel>
              <Select sx={{width:"100%"}} label={t('select_hour_type')} onChange={selectMeterHour1}>
                <MenuItem value={1}>{t('mono_hour')}</MenuItem>
                <MenuItem value={2}>{t('bi_hour')}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
            <Typography variant='h6' sx={{mr:5}} style={{whiteSpace:'nowrap'}}> {t('meter_type')}: </Typography>
            <FormControl sx={{minWidth:"100%"}}>
              <InputLabel> {t('select_meter_type')} :</InputLabel>
              <Select sx={{width:"100%"}} label={t('select_meter_type')} onChange={selectMeterType1}>
                <MenuItem value={1}> {t('numerical')}</MenuItem>
                <MenuItem value={2}> {t('mechanical')} </MenuItem>
              </Select>
            </FormControl>
          </Stack> </Stack> : 
          <Stack>
          <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}} >
          <Typography variant='h6' sx={{mr:5, display:'inline'}} style={{whiteSpace:'nowrap'}}>{t('hour_type')} </Typography>
          <FormControl sx={{minWidth:"100%"}}>
            <InputLabel>{t('select_hour_type')}:</InputLabel>
            <Select sx={{width:"100%"}} label='Select hour type:' onChange={selectMeterHour1}>
              <MenuItem value={1}>{t('mono_hour')}</MenuItem>
              <MenuItem value={2}>{t('bi_hour')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
          <Typography variant='h6' sx={{mr:5}} style={{whiteSpace:'nowrap'}}>{t('meter_type')} </Typography>
          <FormControl sx={{minWidth:"100%"}}>
            <InputLabel>{t('select_meter_type')} :</InputLabel>
            <Select sx={{width:"100%"}} label='Select meter type :' onChange={selectMeterType1}>
              <MenuItem value={1}> {t('numerical')}</MenuItem>
              <MenuItem value={2}>{t('mechanical')}</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        </Stack>}
            
            <Stack direction="row" alignItems={"center"} justifyContent={"space-evenly"} sx={{mt:3}}>
              <Button size='large' variant='outlined' sx={{mr:8}} onClick={cancel}>
                {t('cancel')}
              </Button>
              
              <Button size='large' variant='outlined' onClick={confirmRequest}>
                {t('confirm')}
              </Button>
              
            </Stack>
          </Stack>
        </Box>
        
      </Stack>
      <Dialog open={openError} onClose={() => setOpenError(false)}>
        <DialogTitle>{t('error')}</DialogTitle>
        <DialogContent>
          <Alert severity="error">{errorMsg}</Alert>
        </DialogContent>
      </Dialog>
    </Stack>
  )
}

export default ContractRequest