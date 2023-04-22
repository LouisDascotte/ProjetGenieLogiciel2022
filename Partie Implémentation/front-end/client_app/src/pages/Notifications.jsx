import React, { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import{Card, Stack} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';


const Notifications = () => {
  const NOTIFICATIONS_URL = "http://localhost:8080/api/notification/all"
  const pageAddress = "/notifications";
  const pageName = "Notifications";
  const data = [];

  useEffect(()=>{
    const jwt = localStorage.getItem("jwt");
    const response = axios.get(NOTIFICATIONS_URL, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        data = response.data;
        console.log(data);
      })
  })
  
  const columns = [
    {
      field:"status", headerName : "Status", minWidth: 100
    },
    {
      field:"date", headerName : "Date", minWidth: 100
    },
    {
      field:"status", headerName : "Status", minWidth: 100
    }, 
    {
      field:"type", headerName : "Type", minWidth: 100
    },
    {
      field : "sender", headerName : "Sender", minWidth: 100
    }
  ]
  

  const rows = data.map((row)=>({
    status : row.status,
    date : row.date,
    type : row.type,
    sender : row.sender
  }))
  
  
  
  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={pageAddress} pageName={pageName}/>
        <Card sx={{m:5, height:'100%', width:"90%"}}>
          <DataGrid 
          rows={rows} 
          columns={columns} 
          pageSize={10} 
          slots={{
            toolbar: GridToolbar,
          }}
          />
        </Card>
      </Stack>
    </Stack>
  );
}

export default Notifications