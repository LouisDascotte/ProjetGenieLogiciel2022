import React from 'react'
import TopMenu from '../TopMenu'
import SideMenu from '../SideMenu'
import {Stack, Box, Typography, IconButton} from '@mui/material'
import {useLocation, useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
import  ArrowBackIcon  from '@mui/icons-material/ArrowBack'




const Notification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageAddress = "/notification";
  const pageName = "Notification";

  function notificationMessages(code){
    switch (code) {
      case "READING_NOTIFICATION":
        return "Your reading entry has been sent.";
      case "CONTRACT_REQUEST_NOTIFICATION":
        return "Your contract request has been sent.";
      case "ACCEPT_CONTRACT_NOTIFICATION":
        return "Your contract request has been accepted."
      case "CANCEL_CONTRACT_REQUEST_NOTIFICATION":
        return "Your contract cancellation request has been sent."
      case "END_CONTRACT_NOTIFICATION":
        return "Your contract has ended."
      case "CANCEL_CONTRACT_NOTIFICATION": 
        return "Your contract has been cancelled."
      case "LINK_METER_NOTIFICATION"  :
        return "Your meter has been linked."
      case "UNLINK_METER_NOTIFICATION":
        return "Your meter has been unlinked."
      case "NOTIFICATION":
        return "You received a notification."
    }
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
            back
          </IconButton>
          <Box sx={{m:2, backgroundColor:'#9bcc6c', borderRadius:'16px'}}>
            <Typography variant='h4' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
              {notificationMessages(location.state.type)}
            </Typography>
          </Box>
          <Box sx={{m:2}}>
            <Stack textAlign={'center'}>
              <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                <strong>Date :</strong> {location.state.date}
              </Typography>
              <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                <strong>Sender :</strong> {location.state.senderId}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  </Stack>
  )
}

export default Notification