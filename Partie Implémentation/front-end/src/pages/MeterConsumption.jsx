import {React, useState} from 'react';
import axios from "../api/axios";
import {Card, Stack, Button, TextField, InputAdornment} from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TopMenu from '../components/TopMenu';
import SideMenu from '../components/SideMenu';
 
const URL = "http://localhost:8080/api/meter/reading/add";

const MeterConsumption = (ean) => {
  
  const pageAddress = "/enter-consumption";
  const pageName = "Enter meter consumption";

  const current_date = new Date();
  let day = current_date.getDate();
  let month = current_date.getMonth()+1;
  let year = current_date.getFullYear();


  const [selectedDate, setSelectedDate] = useState(dayjs(`${year}-${month}-${day}`));
  const [value, setValue] = useState("");

  const meter_ean = ean; 
  
  const navigate = useNavigate();

  const cancel = () => {
    navigate("/manage-meters");
  }
  const submit = () => {
    
    const data = {
      EAN : meter_ean,
      date : (selectedDate.$y).toString()  +'-'+ (selectedDate.$M +1 ).toString().padStart(2, '0') + '-'+ (selectedDate.$D).toString().padStart(2, '0') , 
      value : value,
    }

    try {
      const jwt = localStorage.getItem("jwt");
      const response = axios.post(URL, null, {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      , params:{
        EAN : meter_ean, 
        date : selectedDate.valueOf(), 
        value : value,
      }}).then(response=>{
        console.log(response.data);
      })
    } catch(err){
      console.log(err);
    }
    
  }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Card  sx={{width:"60%", m:5}}>
          <Stack>
          <Button variant='outlined' sx={{m:1}}>{`${meter_ean}`}</Button>
            <Stack> 
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{m:1}} label='Select the date' value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
              </LocalizationProvider>
            </Stack>
            <Stack>
              <TextField sx={{m:1}} label='Enter consumption' onChange={(event)=> {
                setValue(event.target.value);
              }} InputProps={{
                endAdornment: <InputAdornment position="end">kWh</InputAdornment>
              }}/>
            </Stack>
            <Button sx={{m:1}} onClick={submit}>
              Confirm data
            </Button>
            <Button sx={{m:1}} onClick={cancel}>
              Cancel
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}

export default MeterConsumption;