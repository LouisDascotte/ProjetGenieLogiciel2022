import {React, useState, useEffect} from 'react'
import axios from "../api/axios";
import {useNavigate, useLocation} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import {Paper, Button, Stack, IconButton , Dialog, DialogTitle, DialogContent, Snackbar, Alert} from "@mui/material";
import TopMenu from "../components/TopMenu";
import SideMenu from "../components/SideMenu";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Offer from '../components/Offer';


const OffersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageAddress = "/offers";
  const pageName = "Offers";
  const CONTRACT_URL = "http://localhost:8080/api/contract";

  const jwt = localStorage.getItem("jwt");

  const [offers, setOffers] = useState([]);

  useEffect(() => {
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
}, []);



  let parameters = {};

  if (location.state.body === undefined){
    navigate("/contract-request");
  } else {
    parameters = location.state.body;
  }

  console.log(location.state.body)

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

  const handleConfirm = () => {
    console.log(parameters)
    try{
      const req = axios.post(CONTRACT_URL, parameters, {
        headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      , params : {
        offerId : selectedOffer
      }}).then(response => {
        console.log(response.data);

        navigate("/manage-contracts");
      })
    } catch (err){
      console.log(err);
    }
  }


  console.log(selectedOffer)
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems={'center'}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <IconButton onClick={() => navigate(-1)} sx={{mt:2}}>
          <ArrowBackIcon/>
          <div> back</div>
        </IconButton>
        <Paper sx={{width:"60%", height:"60vh"}} component={Stack} direction='column' justifyContent={'center'}>
          <Dialog open={open} onClose={()=> setOpen(false)}>
            <DialogTitle>Offer {selectedOffer}</DialogTitle>
            <DialogContent>
              <h1>Do you want to confirm this contract request ?</h1>
              <Stack direction='row' alignItems='center' justifyContent={'space-evenly'}>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleConfirm}>
                  Confirm
                </Button>
              </Stack>
            </DialogContent>
          </Dialog>
          <Carousel>
            {offers.map(item => <Offer key={item.offer_id} offer={item} selectOffer={selectOffer} />)}
          </Carousel>
          <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='success'>Portfolio successfully created !</Alert>
          </Snackbar>
        </Paper>
      </Stack>
    </Stack>
  )
}

export default OffersPage