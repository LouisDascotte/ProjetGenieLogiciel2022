import React, { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "../api/axios";
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import{Card, Stack} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';


const ConsumptionHistoryPage = () => {
  
  const {id} = useParams();

  const jwt = localStorage.getItem("jwt");
  const URL2 = `http://localhost:8080/api/portfolio/${id}/consumption`
  const [data, setData] = useState({});
  const [elec, setElec] = useState([]);
  const [gas, setGas] = useState([]);
  const [water, setWater] = useState([]);

  useEffect(()=>{
    const response = axios.get(URL2, {
      headers : {"Content-Type":"application/json",
      "Authorization" : `Bearer ${jwt}`,
      "Access-Control-Allow-Origin":true}
      }).then(response=>{
        setElec(response.data.ELEC);
        setGas(response.data.GAZ);
        setWater(response.data.WATER);
        setData(response.data);
      })
  }, [])


  const columns = [
    {
      field:"ean", headerName : "EAN", minWidth: 200
    }, 
    {
      field:"date", headerName:"Date", minWidth: 150
    },
    {
      field:"value", headerName:"Value", minWidth: 150
    }, 
    {
      field:"energy", headerName:"Energy", minWidth: 150
    }
  ]

let elec_rows = []
let gas_rows = []
let water_rows = []

if (!(data.ELEC === undefined)){
  elec_rows = elec.map((row)=>({
    ean : row.ean,
    date : row.date, 
    id : row.id, 
    value : row.value,
    energy : "ELEC"
  }))
} else {
  elec_rows = []
}

if (!(data.GAZ === undefined)){
  gas_rows = gas.map((row)=>({
    ean : row.ean,
    date : row.date,
    id : row.id,
    value : row.value,
    energy : "GAS"
  }))
} else {
  gas_rows = []
}

if (!(data.WATER === undefined)){
  water_rows = water.map((row)=>({
    ean : row.ean,
    date : row.date,
    id : row.id,
    value : row.value,
    energy : "WATER"
  }))
} else {
  water_rows = []
}


  const rows = elec_rows.concat(gas_rows, water_rows);

 

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}}>
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%"}}>
        <TopMenu pageAddress={"/consumption-history"} pageName={"Consumption History"}/>
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

export default ConsumptionHistoryPage