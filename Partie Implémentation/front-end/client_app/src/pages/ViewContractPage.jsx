import React from 'react'
import TopMenu from '../components/TopMenu'
import SideMenu from '../components/SideMenu'
import {Stack, Box, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle} from '@mui/material'
import { useLocation, useNavigate} from 'react-router-dom'
import axios from '../api/axios'
import  ArrowBackIcon  from '@mui/icons-material/ArrowBack'

const ViewContractPage = () => {
  const pageAddress = "/view-contract";
  const pageName = "View Contract";
  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt')
  const [address, setAddress] = React.useState('')
  const [meter, setMeter] = React.useState({})
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=> {
    let temp_meter = {}

    const response = axios.get("http://localhost:8080/api/meter/all", {
      headers: {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true
      }
    }).then(response => {
      response.data.map(meter => {
        if (meter.ean === location.state.ean){
          setAddress(meter.address)
          setMeter(meter);
          temp_meter = meter;
          const request = axios.get("http://localhost:8080/api/contract/offers", {
            headers: {
              "Content-Type":"application/json",
              "Authorization" : `Bearer ${jwt}`,
              "Access-Control-Allow-Origin":true
            }, params : {
              hourType : temp_meter.hourType,
              energyType : temp_meter.energyType,
              address : temp_meter.address,
            }
          }).then(request => {
            console.log(request.data)
          } )}
        })
      })
    }, [])

  
  const handleCancelContract = () => {
    const response = axios.delete(`http://localhost:8080/api/contract/${location.state.id}`, {
      headers : {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true
      }
    }).then(response => {
      console.log(response.data);
    })
  }

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
              <Stack textAlign={'center'} alignContent='center' alignItems='center'>
                {location.state.status === 'ACCEPTED' ? <Stack>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Begin Date :</strong> {location.state.beginDate}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>End Date :</strong> {location.state.endDate}
                </Typography>
                  </Stack> : null}
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Status :</strong> {location.state.status}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Offer :</strong> {location.state.offerId}
                </Typography>
                <Typography variant='h4' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Technical characteristics</strong>
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>EAN :</strong> {location.state.ean}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Address :</strong> {address}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>Energy type :</strong> {meter.energyType === 'ELEC' ? 'Electricity' : meter.energyType === 'GAZ' ? 'Gas' : meter.energyType === 'WATER' ? 'Water' : 'Gas and electricity'}
                </Typography>
                <Button variant='contained' onClick={()=> setOpen(true)} sx={{mt:2, backgroundColor:"red", width:'40%'}}>
                  Cancel contract
                </Button>
                <Dialog open={open} onClose={()=>setOpen(false)}>
                  <DialogTitle>
                    Are you sure you want to cancel this contract ?
                  </DialogTitle>
                  <DialogContent>
                    <Stack direction='row' justifyContent='center' alignItems='center' alignContent='center'>
                      <Button variant='contained' sx={{backgroundColor:'red', width:'40%', mr:3}} onClick={handleCancelContract}>
                        Yes
                      </Button>
                      <Button variant='contained' sx={{backgroundColor:'green', width:'40%'}} onClick={()=> setOpen(false)}>
                        No
                      </Button>
                    </Stack>
                    
                  </DialogContent>
                </Dialog>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}

export default ViewContractPage