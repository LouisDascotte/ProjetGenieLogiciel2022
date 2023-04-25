import {React, useState} from 'react';
import axios from "../api/axios";
import {Card, Stack, Button, TextField, InputAdornment, IconButton} from "@mui/material";
import { useNavigate, Link , useLocation} from 'react-router-dom';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
 
const URL = "http://localhost:8080/api/meter/";

const MeterConsumption = () => {

  const location = useLocation();
  const pageAddress = "/enter-consumption";
  const pageName = "Enter meter consumption";
  const current_date = new Date();
  let day = current_date.getDate();
  let month = current_date.getMonth()+1;
  let year = current_date.getFullYear();
  const [selectedDate, setSelectedDate] = useState(dayjs(`${year}-${month}-${day}`));
  const [value, setValue] = useState("");
  const [dayValue, setDayValue] = useState("");
  const [nightValue, setNightValue] = useState("");
  const meter_ean = location.state.ean; 
  const navigate = useNavigate();

  console.log(location.state)

  const cancel = () => {
    navigate("/manage-meters");
  }
  
  const submit = () => {
    const jwt = localStorage.getItem("jwt");
    

    if (location.state.hourType === "SIMPLE") {
      const data = {
        EAN : meter_ean,
        date : (selectedDate.$y).toString()  +'-'+ (selectedDate.$M +1 ).toString().padStart(2, '0') + '-'+ (selectedDate.$D).toString().padStart(2, '0') , 
        value : value,
      }

      try {
        
        const response = axios.post(URL + `${meter_ean}` + "/reading", null, {
          headers : {"Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true}
        , params:{ 
          date : data.date, 
          value : data.value,
          overwrite : true
        }}).then(response=>{
          console.log(response.data);
          
        })
      } catch(err){
        console.log(err);
      }
    } else {
      const data = {
        EAN : meter_ean,
        date : (selectedDate.$y).toString()  +'-'+ (selectedDate.$M +1 ).toString().padStart(2, '0') + '-'+ (selectedDate.$D).toString().padStart(2, '0') , 
        dayValue : dayValue,
        nightValue : nightValue
      }
      try {
        const response = axios.post(URL + `${meter_ean}` + "/reading/double", null, {
          headers : {"Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true}
        , params:{
          EAN : data.meter_ean, 
          date : data.date, 
          dayValue : data.dayValue,
          nightValue : data.nightValue,
          overwrite : true
        }}).then(response=>{
          console.log(response.data);
          
        })
      } catch (err){

      }
    }

    
    
  }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>    
        <Stack>
          <IconButton sx={{m:1}} onClick={() => navigate(-1)}> 
            <ArrowBackIcon/>
            <div>back</div>
          </IconButton>
          <Button variant='outlined' sx={{m:1}}>{`${meter_ean}`}</Button>
            <Stack> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{m:1}} label='Select the date' value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
              </LocalizationProvider>
            </Stack>
            <Stack>
              {location.state.hourType === "SIMPLE" ? <TextField sx={{m:1}} type="number"  onkeydown="return event.keyCode !== 69" label='Enter consumption' onChange={(event)=> {
                setValue(event.target.value);
              }} InputProps={{
                endAdornment: <InputAdornment position="end">{location.state.energyType === "ELEC" ? 'kWh' : 'm3'}</InputAdornment>
              }}/>: <Stack>
                <TextField sx={{m:1}} type="number"  onkeydown="return event.keyCode !== 69" label='Enter day consumption' onChange={(event)=> {
                setDayValue(event.target.value);
              }} InputProps={{
                endAdornment: <InputAdornment position="end">kWh</InputAdornment>
              }}/>
              <TextField sx={{m:1}} type="number"  onkeydown="return event.keyCode !== 69" label='Enter night consumption' onChange={(event)=> {
                setNightValue(event.target.value);
              }} InputProps={{
                endAdornment: <InputAdornment position="end">kWh</InputAdornment>
              }}/>
                </Stack> }
            </Stack>
            <Button sx={{m:1}} onClick={submit}>
              Confirm data
            </Button>
            <Button sx={{m:1}} onClick={cancel}>
              Cancel
            </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MeterConsumption;