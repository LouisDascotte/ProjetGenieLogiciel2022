import React from 'react'
import TopMenu from '../components/TopMenu'
import SideMenu from '../components/SideMenu'
import {Stack, Box, Typography, IconButton} from '@mui/material'
import { useLocation, useNavigate} from 'react-router-dom'
import axios from '../api/axios'
import  ArrowBackIcon  from '@mui/icons-material/ArrowBack'

const ViewInvoice = () => {
  const pageAddress = "/view-invoice";
  const pageName = "View Invoice";
  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt')

 

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}} alignItems='center'>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Box sx={{width:"80%", m:5, borderRadius:'16px', backgroundColor:'white'}}>
          <Stack textAlign='center'>
            <IconButton onClick={()=>navigate(-1)}>
              <ArrowBackIcon/>
            </IconButton>
            <Box sx={{m:2, backgroundColor:'#9bcc6c', borderRadius:'16px'}}>
              <Typography variant='h4' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                Contract  #{location.state.id}
              </Typography>
            </Box>
            <Box sx={{m:2}}>
              <Stack textAlign={'center'}>
                {location.state.status === 'PAID' ? <Stack>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Date :</strong> {location.state.date}
                </Typography>
                  </Stack> : null}
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Status :</strong> {location.state.status}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Price :</strong> {location.state.price}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}

export default ViewInvoice