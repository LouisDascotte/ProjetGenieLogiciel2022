import React, { useEffect } from 'react';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import{Card, Stack} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';

const URL = "http://localhost:8080/api/payments/all";
const jwt = localStorage.getItem("jwt");


const MonthlyAdvancePaymentsHistory = () => {

  

  const hardData = [
    {id: 1, name: "Invoice 1", price : 100, status: "PAID", date : "2021-10-10"},
    {id: 2, name: "Invoice 2", price : 200, status: "UNPAID"},
    {id: 3, name: "Invoice 3", price : 300, status : "PAID", date : "2022-02-02"},
    {id: 4, name: "Invoice 4", price : 400, status : "PAID", date : "2023-02-02"},
  ]
  
  
 /* useEffect(()=>{
    const response = axios.get(URL, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setData(response.data)
      })
  }, [])*/


  const columns = [
    {
      field:"name", headerName : "Name", minWidth: 200
    }, 
    {
      field:"price", headerName:"Price", minWidth: 150
    }, 
    {
      field:"date", headerName : "Date",  minWidth: 100
    },
    {
      field:"id", headerName:"ID",  minWidth: 150
    },
    {
      field:"status", headerName:"Status", minWidth: 50
    }
  ]

  const rows = hardData.map((row)=>({
    name : row.name,
    id : row.id,
    price : row.price,
    status : row.status,
    date : row.status === "PAID" ? row.date : null
  }))
  


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={"/monthlya"} pageName={"Monthly Advance Payment History"}/>
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

export default MonthlyAdvancePaymentsHistory