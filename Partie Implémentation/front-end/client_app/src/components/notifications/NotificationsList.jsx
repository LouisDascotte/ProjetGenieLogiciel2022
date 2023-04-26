import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText , Snackbar, Alert} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotificationsList = ({fresh}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
  }, [])

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
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {notifications.map(notification =>  
        <ListItem>
          <ListItemButton onClick={()=>handleClick(notification)}>
            <ListItemText>
              {notification.status === "UNREAD" ? <div style={{color:"red", justifyContent:"space-between"}}>{notificationMessages(notification.type)} {notification.date}</div> : <div style={{display:"flex" ,justifyContent:"space-between"}}><div>{notificationMessages(notification.type)} </div><div>[ {t('date')} : {notification.date}]</div></div>}
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
  )



}


export default NotificationsList