import {React, useState, useEffect} from 'react'
import axios from "../api/axios";
import {useNavigate, useLocation} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import {Paper, Button, Stack, IconButton , Dialog, DialogTitle, DialogContent, Snackbar, Alert} from "@mui/material";
import TopMenu from "../components/TopMenu";
import SideMenu from "../components/SideMenu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Offer from '../components/Offer';
import {useTranslation} from 'react-i18next';


const OffersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const pageAddress = "/offers";
  const pageName = t('offers');
  const CONTRACT_URL = "http://localhost:8080/api/contract";

  const jwt = localStorage.getItem("jwt");

  const [offers, setOffers] = useState([]);

  console.log(location.state.body.energyType);

  useEffect(() => {
    if (location.state.body.energyType === "ELECTRICITY_AND_GAS"){
      const response = axios.get("http://localhost:8080/api/contract/offers/gaz_elec", {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}, params : { 
        hourType : location.state.body.hourType,
        address : location.state.body.address,
      }
    }
  ).then(response=>{
    setOffers(response.data);
  })

    } else {
      const response = axios.get("http://localhost:8080/api/contract/offers", {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}, params : { 
        hourType : location.state.body.hourType,
        energyType : location.state.body.energyType,
        address : location.state.body.address,
      }
    }
  ).then(response=>{
    setOffers(response.data);
  })
    }
    
}, []);



  let parameters = {};

  if (location.state.body === undefined){
    navigate("/contract-request");
  } else {
    parameters = location.state.body;
  }

  const [selectedOffer, setSelectedOffer] = useState("");
  
  const selectOffer = (offer_id) => {
    setSelectedOffer(offer_id);
    setOpen(true);
  }

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCancel= ()=>{
    setSelectedOffer(null);
    setOpen(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway'){
      return; 
    }

    setSuccess(false);
  }

  const handleConfirm = async () => {
    console.log(parameters)
    try{
      if (parameters.energyType === "ELECTRICITY_AND_GAS"){
        const req = await axios.post("http://localhost:8080/api/contract/gaz_elec", parameters, {
          headers : {
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${jwt}`,
            "Access-Control-Allow-Origin":true
          }, params : {
            offerId : selectedOffer,
          }
        }).then(response => {
          setSuccess(true);
          setOpen(false);
          setTimeout(()=>{
            navigate("/manage-contracts");
          }, 2000)
        })
      } else {
        const req =await  axios.post(CONTRACT_URL, parameters, {
          headers : {"Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true}
        , params : {
          offerId : selectedOffer
        }}).then(response => {
          navigate("/manage-contracts");
        })
      }
      
    } catch (err){
      console.log(err);
    }
  }

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems={'center'}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <IconButton onClick={() => navigate(-1)} sx={{mt:2}}>
          <ArrowBackIcon/>
          <div>{t('back')}</div>
        </IconButton>
        <Paper sx={{width:"60%", height:"60vh"}} component={Stack} direction='column' justifyContent={'center'}>
          <Dialog open={open} onClose={()=> setOpen(false)}>
            <DialogTitle>{t('offer')} {selectedOffer}</DialogTitle>
            <DialogContent>
              <h1>{t('confirm_contract_request')}</h1>
              <Stack direction='row' alignItems='center' justifyContent={'space-evenly'}>
                <Button onClick={handleCancel}>
                  {t('cancel')}
                </Button>
                <Button onClick={handleConfirm}>
                  {t('confirm')}
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
           {offers.length === 0 ? <h1 alignItems='center' justifyContent='center' style={{textAlign:"center"}}>{t('no_offers')}</h1> :
           <Carousel>
           {offers.map(item => <Offer key={item.offer_id} offer={item} selectOffer={selectOffer} />)}
         </Carousel> }
          
          <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'> {t('contract_request_success')}</Alert>
          </Snackbar>
        </Paper>
      </Stack>
    </Stack>
  )
}

export default OffersPage