import React from 'react'
import TopMenu from '../TopMenu'
import SideMenu from '../SideMenu'
import {Stack, Box, Typography, IconButton, Button} from '@mui/material'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
import  ArrowBackIcon  from '@mui/icons-material/ArrowBack'
import { useTranslation } from 'react-i18next'



const Notification = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const notif = location.state;
  const navigate = useNavigate();
  const pageAddress = "/notification";
  const pageName = t('notifications');
  console.log(notif);

  function notificationMessages(code){
    switch (code) {
      case "READING_NOTIFICATION":
        return "Your reading entry has been sent.";
      case "CONTRACT_REQUEST_NOTIFICATION":
        return "Your contract request has been sent.";
      case "CANCEL_CONTRACT_REQUEST_NOTIFICATION":
        return "Your contract cancellation request has been sent."
      case "NOTIFICATION":
        return "You received a notification."
      default :
        return "You received a notification.";
    }
  }

  const handleNotifDelete = () => {
    axios.delete(`http://localhost:8080/api/notification/${location.state.id}`,
    {headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
    "Access-Control-Allow-Origin":true}}
    ).then(response=>{
      console.log(response);
      navigate('/notifications');
    }).catch(err=>{
      console.log(err);
    }
    );
  }

  const handleProdPoint = async () => {
    await axios.put(`http://localhost:8080/api/portfolio/accept_production_point`, null, 
    {headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
    "Access-Control-Allow-Origin":true},
    params : {EAN : notif.ean}}
    ).then(response=>{
      console.log(response);
      navigate('/notifications');
    }).catch(err=>{
      console.log(err);
    }
    );
  }

  const handleGreenCert = async () => {
  await axios.put(`http://localhost:8080/api/portfolio/${notif.portfolioId}/accept_green_certificate`, null,
  {headers : {"Content-Type":"application/json",
  "Authorization" : `Bearer ${localStorage.getItem("jwt")}`,
  "Access-Control-Allow-Origin":true}}
  ).then(response=>{
    console.log(response);
    navigate('/notifications');
  }
  ).catch(err=>{
    console.log(err);
  }
  );
}
  
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
    <SideMenu/>
    <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
      <TopMenu pageAddress={pageAddress} pageName={pageName}/>
      <Box sx={{width:"80%", m:5, borderRadius:'16px', backgroundColor:'white'}}>
        <Stack textAlign='center'>
          <IconButton onClick={()=> navigate(-1)}>
            <ArrowBackIcon/>
            {t('back')}
          </IconButton>
          <Box sx={{m:2, backgroundColor:'#9bcc6c', borderRadius:'16px'}}>
            <Typography variant='h4' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
              {notificationMessages(location.state.type)}
            </Typography>
          </Box>
          <Box sx={{m:2}}>
            <Stack textAlign={'center'}>
              <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                <strong> {t('date')} :</strong> {location.state.date}
              </Typography>
              <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                <strong> {t('sender')} :</strong> {location.state.senderId}
              </Typography>

              { location.state.type === "CONTRACT_REQUEST_NOTIFICATION" ?
                <Button variant='contained' color='primary' sx={{m:2}} onClick={() => navigate(`/contracts/requests/${location.state.contract.id}`, {state : location.state.contract})} >
              {t('Click to be redirected')}
                </Button>
              : null }
              { location.state.type === "CANCEL_CONTRACT_REQUEST_NOTIFICATION" ?
                <Button variant='contained' color='primary' sx={{m:2}} onClick={() => navigate(`/contracts/${location.state.contract.id}`, {state : location.state.contract})} >
              {t('Click to be redirected')}
                </Button>
              : null }

              { location.state.type === "READING_NOTIFICATION" ?  null
              : null}

              { location.state.type === "PRODUCTION_POINT_REQUEST_NOTIFICATION" ?
                <Button variant='contained' color='primary' sx={{m:2}} onClick={handleProdPoint} >
                  Accept Request
                </Button>
              : null}

              { location.state.type === "GREEN_CERTIFICATE_REQUEST_NOTIFICATION" ? 
                <Button variant='contained' color='primary' sx={{m:2}} onClick={handleGreenCert} >
                  Accept Request
                </Button>
              : null}

              <Link to='/notifications'>
                <Button variant='contained' onClick={handleNotifDelete} color='primary' sx={{m:2}}>
                  {t('delete notification')}
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  </Stack>
  )
}

export default Notification