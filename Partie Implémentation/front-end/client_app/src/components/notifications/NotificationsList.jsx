import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../../api/axios";
import { useNavigate } from 'react-router-dom';


const NotificationsList = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const [state, setState] = useState(0);

  useEffect(()=> {
    const response = axios.get("http://localhost:8080/api/notification/all", {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setNotifications(response.data);
        console.log(notifications);
      })
  }, [])

  const handleClick = (notification) => {
    // METHOD TO MARK NOTIFICATION AS READ TO BE IMPLEMENTED
    const response = axios.put(`http://localhost:8080/api/notification/${notification.id}/read`, {
      headers : {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${jwt}`,
        "Access-Control-Allow-Origin":true
      }
    }).then(response => {
      console.log(response.data);
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
              {notification.status === "UNREAD" ? <div style={{color:"red"}}>{notification.date}</div> : notification.date}
            </ListItemText>
          </ListItemButton>
          <IconButton onClick={()=>console.log("hello")}>
            <DeleteIcon/>
          </IconButton>
        </ListItem>
        )}
      </List>
    </Box>
  )



}


export default NotificationsList