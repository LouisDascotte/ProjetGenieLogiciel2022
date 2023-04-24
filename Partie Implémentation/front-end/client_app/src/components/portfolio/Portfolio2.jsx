import { Button, FormControl, Select, IconButton, Card, MenuItem, Stack,Dialog, DialogTitle, DialogContent, TextField, Typography, skeletonClasses, Box, Grid, Icon } from '@mui/material';
import {React, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from '../../api/axios';
import TopMenu from '../TopMenu';
import SideMenu from '../SideMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const METER_URL = "http://localhost:8080/api/meter/all";
const PORTFOLIO_URL = "http://localhost:8080/api/portfolio";
export const Portfolio2 = () => {
  const {id} = useParams();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    supplyPoints : []
  });
  const [meters, setMeters] = useState([]);
  const pageAddress = "";
  const pageName= "Manage portfolio"; 
  const [activeMeters, setActiveMeters] = useState([]);
  const [activeProductionPoints, setActiveProductionPoints] = useState([]);
  const [state, setState] = useState(0);

  useEffect(()=>{

    const response = axios.get(METER_URL, {
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response => {
      setMeters(response.data);
    })


    const portfolios = axios.get(PORTFOLIO_URL + "/all", {
      headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(portfolios=>{
      portfolios.data.map(portfolio => {
        if (portfolio.id === id) {
          setPortfolio(portfolio);
          setActiveMeters(portfolio.supplyPoints)
        }
      })
    })
  }, [state])
    
  
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [supplyPoints, setSupplyPoints] = useState(portfolio.supplyPoints);  
  const [selectedMeters, setSelectedMeters] = useState([]);
  const [selectedMetersToRemove, setSelectedMetersToRemove] = useState([]);
  const [tempMeter, setTempMeter] = useState("");
  

  const handleSelect = (e) => {
    setTempMeter(e.target.value);
  }

  function checkMeter(ean){
    
    meters.map(meter=>{
      if (meter.ean === ean){
        return false; 
      }
    })
    return true;
  }

  const handleConfirm = () => {
    if ((!selectedMeters.includes(tempMeter))){
     
      if (checkMeter(tempMeter)){
        
        selectedMeters.push(tempMeter);
      }
    }
    setOpen(false);
  }

  const handleCancel = () => {
    setTempMeter("");
    setOpen(false);
  }

  const removeSelected = (meter) => {
    const index = selectedMeters.indexOf(meter);
    if (index > -1) {
      selectedMeters.splice(index, 1);
    }
    setState(state+1);
  }

  const update = () => {
    
    let body = [];
    selectedMeters.map(meter => {
      for (let i = 0; i < meters.length; i++) {
        if (meter === meters[i].ean) {
         
          body.push(meters[i]);
        }
      }
    });

    

    for (let i = 0; i < body.length; i++) {
      
      const req = axios.post(PORTFOLIO_URL + `/${id}/supply_point`, JSON.stringify(body[i]), {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(req => {
        
      })
    }

    let body2 = [];
    selectedMetersToRemove.map(meter => {
      for (let i = 0; i < meters.length; i++) {
        if (meter === meters[i].ean) {
          body2.push(meters[i]);
        }
      }
    })

    for (let i = 0; i < body2.length; i++) {
      const req = axios.delete(PORTFOLIO_URL + `/${id}/supply_point/${body2[i].ean}`, {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(req => {
        
      })
    }

    setState(state+1);

    window.location.reload(true);
  }

  const deleteMeter = (ean) => {
    selectedMetersToRemove.push(ean);
    setState(state+1);
  }


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems={"center"}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/> 
        <Stack alignItems='center' justifyContent={"center"}>
          <IconButton>
            <ArrowBackIcon onClick={() => navigate(-1)}/>
          </IconButton>
          <Card sx={{m:5}} container justify='center'>
            <Grid container spacing={0} alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
              <Typography variant="h4">{portfolio.name}</Typography>
            </Grid>
            <Typography variant="h5" sx={{m:2}}>
              Linked supply points :
            </Typography>
            {activeMeters.map(meter => 
            <Stack direction="row">
              <Typography variant="h6" sx={{m:2}} value={meter.id}>• {meter.ean}</Typography>
              <IconButton sx={{mr:2}} onClick={() => {deleteMeter(meter.ean)}}>
                <DeleteIcon/>
              </IconButton>
            </Stack>
              
            )}
            <Typography variant="h5" sx={{m:2}}>
              Linked Production points :
            </Typography>
            <Typography variant="h5" sx={{m:2}}>
              Selected supply points to add : 
            </Typography>
            {selectedMeters.map(meter => 
            <Stack direction="row">
              <Typography variant="h6" sx={{m:2}}>• {meter}</Typography>
              <IconButton sx={{mr:2}} onClick={() => {removeSelected(meter)}}>
                <DeleteIcon/>
              </IconButton>
            </Stack>
              
            )}
            <Typography variant="h5" sx={{m:2}}>
              Selected supply points to delete :
            </Typography>
            {selectedMetersToRemove.map(meter => 
            <Stack direction="row">
              <Typography variant="h6" sx={{m:2}}>• {meter}</Typography>
            </Stack>
              
            )}
            <Typography variant="h5" sx={{m:2}}>
              Address : 
            </Typography>
            <Typography variant="h6" sx={{m:2}}>
              {portfolio.address}
            </Typography>
            <Button sx={{m:2}} onClick={() => setOpen(true)} size="large">
              Add supply point
            </Button>
            <Button onClick={()=> navigate(`/consumption/${id}`)}>
              Show consumption
            </Button>
            <Dialog fullWidth open={open} onClose={()=> setOpen(false)}>
              <DialogTitle>
                Add supply point
              </DialogTitle>
              <DialogContent>
                <FormControl fullWidth >
                  <Select onChange={handleSelect}>
                  {meters.map(meter => {
                    if (meter.address === portfolio.address){
                      return (
                        <MenuItem value={meter.ean} key={meter.ean}>
                          {meter.ean}
                        </MenuItem>
                      )
                    }
                  }
                  )}
                  </Select>
                </FormControl>
                <Stack direction="row" justifyContent={"center"}>
                  <Button onClick={handleConfirm}>
                    Confirm
                  </Button>
                  <Button onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              </DialogContent>
            </Dialog>
          </Card>
        </Stack>
        <Button variant="outlined" onClick={update} sx={{width:"60%"}}>
          Apply changes
        </Button>
      </Stack>
    </Stack>
  )
}
