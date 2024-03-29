import React, { useEffect } from 'react';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import{Card, Stack} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import {useTranslation} from "react-i18next";

const URL = "http://localhost:8080/api/meter/allocations";
const jwt = localStorage.getItem("jwt");


const AssignmentHistoryPage = () => {

  const {t} = useTranslation();
  

  const [data, setData] = React.useState([]);

  
  
  useEffect(()=>{
    const response = axios.get(URL, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setData(response.data)
      })
  }, [])


  const columns = [
    {
      field:"ean", headerName : "EAN", minWidth: 200
    }, 
    {
      field:"assignment_date", headerName:"Assignment date", minWidth: 150
    }, 
    {
      field:"supplier", headerName : "Supplier",  minWidth: 100
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
    assignment_date : row.beginDate, 
    supplier : row.supplierName,
    id : row.ean + row.beginDate,
    expiration_date : row.endDate,
    status : row.status
  }))
  


  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={"/assignment-history"} pageName={t('assignment_history')}/>
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