import {React, useEffect, useState} from "react"; 
import axios from "../../api/axios";
import {Box, Card, Stack, FormControl, Button, Select, InputLabel, MenuItem, Grid, IconButton, Dialog, DialogTitle, DialogContent, OutlinedInput, Typography} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { convertLength } from "@mui/material/styles/cssUtils";
import DeleteIcon from '@mui/icons-material/Delete';


const METER_URL = "http://localhost:8080/api/meter/all";
const PORTFOLIO_URL = "http://localhost:8080/api/portfolio";

const Portfolio = ({data}) => {
  
  const address = data.childPortfolio.address.street + " " +  data.childPortfolio.address.houseNo + ", " + data.childPortfolio.address.postalCode + " " + data.childPortfolio.address.city + ", " +  data.childPortfolio.address.country; 

  // used to open/close the popup
  const [openPoint, setOpenPoint] = useState(false);

  const jwt = localStorage.getItem("jwt");

  /*const [meter, setMeter] = useState({
    ean : "", 
    supplyPointType : "",
  });*/

  const [meterEAN, setMeterEAN] = useState("");
  const [supplyPointType, setSupplyPointType] = useState("");

  useEffect(()=>{
    const response = axios.get(METER_URL, {
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
      console.log(response.data);
    })
  }, [])
  

  function confirmPost(){
    let body = {
      ean : meterEAN, 
      supplyPointType : supplyPointType,
    }
    console.log("Posting");
    const response = axios.post(PORTFOLIO_URL + `/${data.childPortfolio.id}` + "/supply_point", JSON.stringify(body), {
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response => {
      console.log(response.data);
    })
  }

  const handleDelete = (ean) => {
    console.log("Deleting : "+ ean);
  }

  const meters = [
    {
      ean : "EAN1234",
      supplyPointType : "SUPPLY_POINT",
    },
    {
      ean : "EAN4567",
      supplyPointType : "SUPPLY_POINT"
    },
  ];

  function handleEanCancel(){
    console.log(data.childPortfolio)
  }

  const handleSelect = (e) => { 
    const {value} = e.target;
    setMeterEAN(value);
    meters.map(meter => {
      if(meter.ean === value){
        setSupplyPointType(meter.supplyPointType)
      }
    })
  }

  const handleConfirm = ()=>{
    setOpenPoint(false);
    confirmPost();
  }


  data.childPortfolio.supplyPoints.map(supplypoint => {
    console.log(supplypoint)
  })

  return (
    <Card sx={{m:5}}>
      <Stack sx={{display:'flex', width:"100%"}} alignement='center'>
        <Box sx={{m:1, width:'100%'}}>
          {data.childPortfolio.name}
        </Box>
        <Card sx={{m:1}}>
          <Grid container spacing={12} direction="row">
            <Grid item xs={6}>
              Supply points
            </Grid>
            <Grid item xs={6}>
              <Box>
                {data.childPortfolio.supplyPoints.length === 0 && meterEAN === "" ? "Add a supply point" : data.childPortfolio.supplyPoints.map(supply_point => 
                <Box>
                  <Stack direction="row" alignItems='center' justifyContent='space-evenly'>
                    <Typography variant="h5">{supply_point.ean}</Typography>
                    <IconButton onClick={() => handleDelete(supply_point.ean)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Stack>
                </Box>
                  
                  )
                }
                <IconButton onClick={()=>setOpenPoint(true)}>
                  <AddIcon/>
                </IconButton>
                <Dialog open={openPoint} onClose={()=> setOpenPoint(false)}>
                  <DialogTitle>
                    Select the supply point
                  </DialogTitle>
                  <DialogContent>
                    <FormControl fullWidth>
                      <InputLabel>
                      {meterEAN}
                      </InputLabel>
                      <Select 
                      onChange={handleSelect} sx={{m:1}}>
                        {meters.map(meter => 
                          <MenuItem value={meter.ean} key={meter.ean}>
                            {meter.ean}
                          </MenuItem>)}
                      </Select>
                    </FormControl>
                    <Stack direction='row' alignment='center' alignContent='center' alignItems='center' justifyContent='center'>
                      <Button onClick={handleEanCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleConfirm}>
                        Confirm
                      </Button>
                    </Stack>
                    
                  </DialogContent>
                </Dialog>
              </Box>
            </Grid>
            
          </Grid>
        </Card>
        <Box sx={{m:1, backgroundColor:"#ABCDEF"}}>
          {"Details : " + address}
        </Box>
      </Stack>
    </Card>
    
  );
}

export default Portfolio; 