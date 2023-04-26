import { Button, FormControl, Select, Box,  IconButton, Card, MenuItem, Stack,Dialog, DialogTitle, DialogContent, Typography, Grid, ButtonGroup, Snackbar, Alert } from '@mui/material';
import {React, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from '../../api/axios';
import TopMenu from '../TopMenu';
import SideMenu from '../SideMenu';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useTranslation} from 'react-i18next';

const METER_URL = "http://localhost:8080/api/meter/all";
const PORTFOLIO_URL = "http://localhost:8080/api/portfolio";
export const Portfolio2 = () => {
  const {t} = useTranslation();
  const {id} = useParams();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    supplyPoints : []
  });
  const [meters, setMeters] = useState([]);
  const pageAddress = "";
  const pageName= t('manage_portfolio'); 
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

  // used to display the error message
  const[problemMeter, setProblemMeter] = useState("");
  const [alreadyInPortfolio, setAlreadyInPortfolio] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSelect = (e) => {
    setTempMeter(e.target.value);
  }

  function checkMeter(ean){
    for (let i = 0; i < meters.length; i++){
      if (meters[i].ean === ean){
        return true; 
      }
    }
    return false; 
  }

  function inActiveMeters(meter){
    for (let i = 0; i < activeMeters.length; i++){
      if (activeMeters[i].ean === meter){
        return true; 
      }
    }
    return false; 
  }

  const handleConfirm = () => {
    if (selectedMeters.includes(tempMeter) === false){
      if (inActiveMeters(tempMeter) === false){
        if (checkMeter(tempMeter)){
          if (tempMeter !== "")
            selectedMeters.push(tempMeter);
        }
      } else if (inActiveMeters(tempMeter) === true){
        console.log("pass")
        setProblemMeter(tempMeter);
        setAlreadyInPortfolio(true);
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

  const update = async () => {
    
    let body = [];
    selectedMeters.map(meter => {
      for (let i = 0; i < meters.length; i++) {
        if (meter === meters[i].ean) {
         
          body.push(meters[i]);
        }
      }
    });
    console.log(meters)

    const responses = [];
   
    for (let i = 0; i < body.length; i++) {
      
      responses.push(await axios.post(PORTFOLIO_URL + `/${id}/supply_point`, JSON.stringify(body[i]), {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }))
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
      responses.push( await axios.delete(PORTFOLIO_URL + `/${id}/supply_point/${body2[i].ean}`, {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }))
    }

    setState(state+1);

    window.location.reload(true);
  }

  const deleteMeter = (ean) => {
    if (selectedMetersToRemove.includes(ean) === false){
      selectedMetersToRemove.push(ean);
      setState(state+1);
    }

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
            <Stack alignItems="center" alignContent="center" justifyContent='center' sx={{textAlign:"center"}}>
            <Grid container spacing={0} alignItems={"center"} alignContent={"center"} justifyContent={"center"}>
              <Typography variant="h4">{portfolio.name}</Typography>
            </Grid>
            <Typography variant="h5" sx={{m:2}}>
              {t('linked_meters')} :
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
              {t('selected_meters_add')} : 
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
              {t('selected_meters_remove')} :
            </Typography>
            {selectedMetersToRemove.map(meter => 
            <Stack direction="row">
              <Typography variant="h6" sx={{m:2}}>• {meter}</Typography>
            </Stack>
              
            )}
           
            <Typography variant="h5" sx={{m:2}}>
              {t('address')} :
            </Typography>
            <Typography variant="h6" sx={{m:2}}>
              {portfolio.address}
            </Typography>
           
            
            <ButtonGroup sx={{mt:1, mb:1}}>
              <Button onClick={() => setOpen(true)}>
               {t('add_meter')}
              </Button>
              <Button onClick={()=> navigate(`/consumption/${id}`)}>
                {t('show_consumption')}
              </Button>
            </ButtonGroup>
            
            <Dialog fullWidth open={open} onClose={()=> setOpen(false)}>
              <DialogTitle>
                {t('add_meter')}
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
                    {t('confirm')}
                  </Button>
                  <Button onClick={handleCancel}>
                    {t('cancel')}
                  </Button>
                </Stack>
              </DialogContent>
            </Dialog>
            </Stack>
            
          </Card>
        </Stack>
        <Button variant="outlined" onClick={update} sx={{width:"60%"}}>
          {t('apply_changes')}
        </Button>
      </Stack>
      <Snackbar open={alreadyInPortfolio} autoHideDuration={6000} onClose={() => setAlreadyInPortfolio(false)}>
          <Alert severity="warning">
            {t('meter_already_linked', {ean : problemMeter})}
          </Alert>
        </Snackbar>
    </Stack>
  )
}
