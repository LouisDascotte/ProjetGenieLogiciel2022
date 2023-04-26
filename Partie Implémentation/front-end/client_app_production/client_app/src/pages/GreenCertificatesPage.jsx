import React, { useEffect } from 'react';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import{Card, Stack, Button, Dialog, DialogTitle, DialogContent, Typography, Snackbar, Alert, IconButton} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import {useTranslation} from 'react-i18next';
import {useParams, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// GET LES GREEN CERTIFICATES 
const URL = "http://localhost:8080/api/portfolio/";
const jwt = localStorage.getItem("jwt");


const GreenCertificatesPage = () => {
  const {t} = useTranslation();
  const {id, ean} = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false); 
  const [success, setSuccess] = React.useState(false); 
  const [prod, setProd] = React.useState([]);
  const [threshold, setThreshold] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  useEffect(()=>{
    const response = axios.get(URL + `${id}/green_certificates`, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setData(response.data)
      })
  }, [])


  useEffect(()=>{
    const response = axios.get(`http://localhost:8080/api/portfolio/${id}/supply_point/${ean}/consumption`, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setProd(response.data);
        const max = response.data.reduce(function(prev, current){
          return (prev.threshold > current.threshold) ? prev : current
        }).threshold        
        setThreshold(max);

      })
  }, [])


  const columns = [
    {
      field:"id", headerName : "ID", minWidth: 200
    }, 
    {
      field:"portfolio_id", headerName:"Portfolio ID", minWidth: 150
    }, 
    {
      field:"date", headerName : "Date",  minWidth: 100
    },
    {
      field:"status", headerName:"Status",  minWidth: 150
    },
  ]

  const rows = data.length === 0 ? null : data.map((row)=>({
    ean : row.ean, 
    assignment_date : row.beginDate, 
    supplier : row.supplierName,
    id : row.ean + row.beginDate,
    expiration_date : row.endDate,
    status : row.status
  }))

  const requestConfirmation = async () => {

    if ( threshold >= 1000) {
      const request = await axios.post('http://localhost:8080/api/portfolio/' + `${id}/request_green_certificate`, null, {
        headers : {
          "Content-Type" : "application/json", 
          "Authorization" : `Bearer ${jwt}`, 
          "Access-Control-Allow-Origin" : true
        }
      }).then(request => {
        setOpen(false);
        setSuccess(true);
      }).catch(err=>{
  
      })
    } else {
      setOpen(false);
      setErrorMsg(t('green_cert_error'));
      setError(true);
    } 
   
      
    
  }

  

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%", height:'90%'}}>
        <TopMenu pageAddress={"/certificates"} pageName={t('green_certificates')}/>
        <Stack justifyContent={'center'} alignContent="center" alignItems='center' sx={{height:"100%"}}>
          <IconButton onClick={()=>navigate(-1)}>
            <ArrowBackIcon/>
          </IconButton>
          <Card sx={{m:5, height:'80%', width:"90%"}}>
            <Stack justifyContent={'center'} alignItems='center' alignContent='center'>
              {data.length === 0 ? <Typography variant='h4'> {t('no_green')}</Typography> : <DataGrid 
              rows={rows} 
              columns={columns} 
              pageSize={10} 
              slots={{
                toolbar: GridToolbar,
              }}
              />}
            </Stack>
          </Card>
          <Button variant='contained' sx={{width:"50%"}} onClick={()=>setOpen(true)}>
            {t('request_green')}
          </Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <Stack justifyContent='center' alignItems='center' alignContent='center'>
              <DialogTitle> {t('request_green')}</DialogTitle>
              <DialogContent>
                <Typography>
                  {t('request_green_confirm')}
                </Typography>
              </DialogContent>
              <Stack direction={'row'} justifyContent='space-between'>
                <Button onClick={()=>setOpen(false)} sx={{mr:4}}>
                  {t('cancel')}
                </Button>
                <Button onClick={requestConfirmation}>
                  {t('confirm')}
                </Button>
              </Stack>
            </Stack>
          </Dialog>
          <Snackbar open={success} autoHideDuration={3000} onClose={()=> setSuccess(false)}>
            <Alert severity='success'>{t('request_success')}</Alert>
          </Snackbar>
          <Snackbar open={error} autoHideDuration={3000} onClose={()=> setError(false)}>
            <Alert severity='error'>{errorMsg}</Alert>
          </Snackbar>
        </Stack>

      </Stack>
    </Stack>
  )
}

export default GreenCertificatesPage