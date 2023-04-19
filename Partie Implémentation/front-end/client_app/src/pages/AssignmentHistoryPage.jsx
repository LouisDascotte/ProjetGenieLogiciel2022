import React, { useEffect } from 'react';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import{Card, Stack} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const URL = "http://localhost:8080/api/meter/allocations";
const jwt = localStorage.getItem("jwt");


const AssignmentHistoryPage = () => {

  const meters_allocs = [
    {
    ean : "EAN1234",
    assignment_date : "12/04/23",
    expiration_date : "12/04/24",
    id : "123134598653",
    supplier : "Belfius",
    status :"active"
    },
    {
    ean : "EAN1334",
    assignment_date : "12/04/23",
    expiration_date : "12/04/24",
    id : "123138598653",
    supplier : "Belfius",
    status :"active"
  },
  {
    ean : "EAN1834",
    assignment_date : "12/04/23",
    expiration_date : "12/04/24",
    id : "123134598623",
    supplier : "Belfius",
    status :"active"
  }
]

  const data = [];

  
  
  useEffect(()=>{
    const response = axios.get(URL, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        data = response.data;
      })
  })


  const columns = [
    {
      field:"ean", headerName : "EAN", minWidth: 100
    }, 
    {
      field:"assignment_date", headerName:"Assignment date", minWidth: 150
    }, 
    {
      field:"supplier", headerName : "Supplier",  minWidth: 100
    },
    {
      field:"id", headerName :"ID",  minWidth: 150
    }, 
    {
      field:"expiration_date", headerName:"Expiration date",  minWidth: 150
    },
    {
      field:"status", headerName:"Status", minWidth: 50
    }
  ]

  const rows = data.map((row)=>({
    ean : row.ean, 
    assignment_date : row.assignment_date, 
    supplier : row.supplier,
    id : row.id,
    expiration_date : row.expiration_date,
    status : row.status
  }))
  


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={"/assignment-history"} pageName={"Assignment History"}/>
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
  )
}

export default AssignmentHistoryPage