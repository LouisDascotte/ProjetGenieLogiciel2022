import React, { useEffect , useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from "../api/axios";
import {DataGrid, GridToolbar, GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,} from '@mui/x-data-grid';
import{Card, Stack, ButtonGroup, Button, IconButton, Box} from "@mui/material";
import SideMenu from '../components/SideMenu';
import TopMenu from '../components/TopMenu';
import PortfolioMainGraph from '../components/PortfolioMainGraph';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const ConsumptionHistoryPage = () => {
  
  const {id} = useParams();
  const {t} = useTranslation();
  const jwt = localStorage.getItem("jwt");
  const URL2 = `http://localhost:8080/api/portfolio/${id}/consumption`
  const [data, setData] = useState({});
  const [elec, setElec] = useState([]);
  const [gas, setGas] = useState([]);
  const [water, setWater] = useState([]);

  const navigate = useNavigate();

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

  // Snippet of code obtained on stackOverflow
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "consumption.json";

    link.click();
  };


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
    value : (row.value === undefined ? row.dayValue + row.nightValue : row.value),
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

  const [type, setType] = useState("TABLE");

  return (
    <Stack direction='row' sx={{width:"100%", height:"100%", position:'fixed'}} >
      <SideMenu/>
      <Stack sx={{display:'flex', width:"100%", height:'100%'}} >
        <TopMenu pageAddress={"/consumption-history"} pageName={t('consumption_history')}/>
        <Stack justifyContent='center' alignContent="center" alignItems='center' sx={{display:'flex'}}>
          <IconButton onClick={()=>navigate(-1)}>
            <ArrowBackIcon/>
          </IconButton>
          <Stack alignItems="center" justifyContent='center' alignContent='center'>

           {type === "TABLE" ? 
           <Card sx={{mt:5, mb:2, minHeight:'60vh', width:"90%"}}>
              <DataGrid 
              rows={rows} 
              columns={columns} 
              pageSize={10} 
              slots={{
                toolbar: GridToolbar,
              }}
              /> </Card>: <Stack sx={{mt:5, minHeight:'60vh', width:"90%"}}><PortfolioMainGraph portfolio={data}/></Stack> 
            }      
          </Stack>
          <ButtonGroup variant="contained">
            <Button onClick={()=> setType("TABLE")}>Table</Button>
            <Button onClick={()=> setType("GRAPH")}>Graph</Button>
            <Button variant="contained" onClick={exportData}>
                {t('export_json')}
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ConsumptionHistoryPage