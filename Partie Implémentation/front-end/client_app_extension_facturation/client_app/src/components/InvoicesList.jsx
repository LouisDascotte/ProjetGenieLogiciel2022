import React, { useState, useEffect} from 'react'
import { Box, Stack, Grid, List, ListItem, ListItemButton, IconButton, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FixedSizeList} from 'react-window';
import axios from "../api/axios";
import {useNavigate} from 'react-router-dom';


const URL = "http://localhost:8080/api/contract/all";


const InvoicesList = () => {
  const [invoices, setInvoices] =  useState([]);
  const navigate = useNavigate();

  const hardData = [
    {id: 1, name: "Invoice 1", price : 100, status: "PAID", date : "2021-10-10"},
    {id: 2, name: "Invoice 2", price : 200, status: "UNPAID"},
    {id: 3, name: "Invoice 3", price : 300, status : "PAID", date : "2022-02-02"},
    {id: 4, name: "Invoice 4", price : 400, status : "PAID", date : "2023-02-02"},
  ]

  useEffect(()=> {
    // getting the jwt
    /*const jwt = localStorage.getItem("jwt");
  
    const response = axios.get(URL, {
    headers : {"Content-Type":"application/json",
    "Authorization" : `Bearer ${jwt}`,
    "Access-Control-Allow-Origin":true}
    }).then(response=>{
    setInvoices(response.data);
    });*/
  }, [])


  
  return (
    <Box sx={{height:'100%', width:'100%'}} alignment='center'>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
        {hardData.map(invoice =>  
        <ListItem key={invoice.id}>
          <ListItemButton onClick={()=> navigate(`/view-invoice/${invoice.id}`, {state : invoice})}>
            <ListItemText>
              {invoice.name}
            </ListItemText>
          </ListItemButton>
        </ListItem>
)}
      </List>
    </Box>
  )
}

export default InvoicesList