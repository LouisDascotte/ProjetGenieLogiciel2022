import React from 'react'
import TopMenu from '../components/TopMenu'
import SideMenu from '../components/SideMenu'
import {Stack, Box, Typography, IconButton, Button, Dialog, DialogContent, DialogTitle, Snackbar, Alert} from '@mui/material'
import { useLocation, useNavigate} from 'react-router-dom'
import axios from '../api/axios'
import  ArrowBackIcon  from '@mui/icons-material/ArrowBack'
import {useTranslation} from 'react-i18next'

const ViewContractPage = () => {
  const pageAddress = "/view-contract";
  const location = useLocation();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt')
  const [address, setAddress] = React.useState('')
  const [meter, setMeter] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const {t} = useTranslation();
  const pageName = t('view_contract');
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

  
  const [success, setSuccess] = React.useState(false);

  const handleCancelContract = () => {
    const response = axios.delete(`http://localhost:8080/api/contract/${location.state.id}`, {
      headers : {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true
      }
    }).then(response => {
      setSuccess(true);
      setOpen(false);
      setTimeout(()=>{
        navigate(-1);
      }, 2000)
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
                {t('contract')}  #{location.state.id}
              </Typography>
            </Box>
            <Box sx={{m:2}}>
              <Stack textAlign={'center'} alignContent='center' alignItems='center'>
                {location.state.status === 'ACCEPTED' ? <Stack>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>{t('begin_date')} :</strong> {location.state.beginDate}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>{t('end_date')} :</strong> {location.state.endDate}
                </Typography>
                  </Stack> : null}
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>{t('status')} :</strong> {location.state.status}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>{t('offer')} :</strong> {location.state.offerId}
                </Typography>
                <Typography variant='h4' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>{t('tech_chars')}</strong>
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>EAN :</strong> {location.state.ean}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong>{t('address')} :</strong> {address}
                </Typography>
                <Typography variant='h5' sx={{mr:5, mt:1.5}} style={{whiteSpace:'nowrap'}}>
                  <strong> {t('energy_type')} :</strong> {meter.energyType === 'ELEC' ? t('elec') : meter.energyType === 'GAZ' ? t('gas') : meter.energyType === 'WATER' ? t('water') : t('gas_elec')}
                </Typography>
                <Button variant='contained' onClick={()=> setOpen(true)} sx={{mt:2, backgroundColor:"red", width:'40%'}}>
                  {t('cancel_contract')}
                </Button>
                <Dialog open={open} onClose={()=>setOpen(false)}>
                  <DialogTitle>
                    {t('cancel_contract_confirm')}
                  </DialogTitle>
                  <DialogContent>
                    <Stack direction='row' justifyContent='center' alignItems='center' alignContent='center'>
                      <Button variant='contained' sx={{backgroundColor:'red', width:'40%', mr:3}} onClick={handleCancelContract}>
                        {t('yes')}
                      </Button>
                      <Button variant='contained' sx={{backgroundColor:'green', width:'40%'}} onClick={()=> setOpen(false)}>
                        {t('no')}
                      </Button>
                    </Stack>
                    
                  </DialogContent>
                </Dialog>
              </Stack>
            </Box>
            <Snackbar open={success} autoHideDuration={6000} onClose={()=>setSuccess(false)}>
              <Alert onClose={()=>setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                {t('contract_cancelled')}
              </Alert>
            </Snackbar>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  )
}

export default ViewContractPage