import React, { useEffect } from 'react';
import axios from "../api/axios";
import {DataGrid} from '@mui/x-data-grid';
import{Stack} from "@mui/material";

const URL = "http://localhost:8080/api/meter/allocations";
const jwt = localStorage.getItem("jwt");


const AssignmentHistoryPage = () => {

  const meters_allocs = [
    {
    EAN : "EAN1234",
    assignment_date : "12/04/23",
    expiration_date : "12/04/24",
    id : "123134598653",
    supplier : "Belfius",
    status :"active"
    },
    {
    EAN : "EAN1334",
    assignment_date : "12/04/23",
    expiration_date : "12/04/24",
    id : "123138598653",
    supplier : "Belfius",
    status :"active"
  },
  {
    EAN : "EAN1834",
    assignment_date : "12/04/23",
    expiration_date : "12/04/24",
    id : "123134598623",
    supplier : "Belfius",
    status :"active"
  }
]
  
  useEffect(()=>{
    const response = axios.get(URL, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        console.log(response.data);
      })
  })


  return (
    <Stack>
      Filler
    </Stack>
  )
}

export default AssignmentHistoryPage