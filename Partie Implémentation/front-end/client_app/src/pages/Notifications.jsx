import React, { useEffect , useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText , Snackbar, Alert, Card, Button} from '@mui/material';
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import NotificationsList from '../components/notifications/NotificationsList';
import { useTranslation } from 'react-i18next';


const Notifications = () => {
  const NOTIFICATIONS_URL = "http://localhost:8080/api/notification/all"
  //const {t} = useTranslation();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const pageAddress = "/notifications";
  const pageName = t('notifications');
  const [data, setData] = useState([]);
  //const jwt = localStorage.getItem("jwt");
  //const [state, setState] = useState(0);

  const refresh =  () => {
    setState(state+1);
  }


  const [notifications, setNotifications] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const [state, setState] = useState(0);
  const [error, setError]  = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  function notificationMessages(code){
    switch (code) {
      case "ACCEPT_CONTRACT_NOTIFICATION":
        return t('ACCEPT_CONTRACT_NOTIFICATION');
      case "END_CONTRACT_NOTIFICATION":
        return t('END_CONTRACT_NOTIFICATION');
      case "CANCEL_CONTRACT_NOTIFICATION": 
        return t('CANCEL_CONTRACT_NOTIFICATION');
      case "LINK_METER_NOTIFICATION"  :
        return t('LINK_METER_NOTIFICATION');
      case "UNLINK_METER_NOTIFICATION":
        return t('UNLINK_METER_NOTIFICATION');
      default :
        return t('DEFAULT_NOTIFICATION');
    }
  }

  useEffect(()=> {
    const interval = setInterval(() => {
      setState(state+1)
    }, 5 * 60 * 1000);
    
    const response = axios.get("http://localhost:8080/api/notification/all", {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setNotifications(response.data);
      }).catch(err=>{
        setErrorMsg(err.message);
        setError(true);
      })

      return () => clearInterval(interval);
  }, [state])

  const handleClick = (notification) => {
    // METHOD TO MARK NOTIFICATION AS READ TO BE IMPLEMENTED
    const response = axios.put(`http://localhost:8080/api/notification/${notification.id}/read`, null, {
      headers : {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true
      }
    }).then(response => {
      
    }).catch(err =>{
      
    })
    navigate("/notification", {state : notification})
  }
  
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Card sx={{m:5, height:'80%', width:"90%"}}>
          <Stack>
          <Button onClick={refresh}>
            {t('refresh')}
          </Button>
          <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {notifications.map(notification =>  
        <ListItem>
          <ListItemButton onClick={()=>handleClick(notification)}>
            <ListItemText>
              {notification.status === "UNREAD" ? <div style={{color:"red", justifyContent:"space-between"}}><div>{notificationMessages(notification.type)}</div> <div>{notification.date}</div></div> : <div style={{display:"flex" ,justifyContent:"space-between"}}><div>{notificationMessages(notification.type)} </div><div>[ {t('date')} : {notification.date}]</div></div>}
            </ListItemText>
          </ListItemButton>
        </ListItem>
        )}
      </List>
      <Snackbar open={error} autoHideDuration={6000} onClose={()=>setError(false)}>
        <Alert onClose={()=>setError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}

export default Notifications