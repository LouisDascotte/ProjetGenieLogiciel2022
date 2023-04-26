import React, { PureComponent , useEffect} from 'react';
import { BarChart, LineChart, Line, Label,  Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stack, CircularProgress, Card, CardContent,  Grid, Typography, ButtonGroup, Button } from '@mui/material';
import  {datas} from "../resources/hardcodedGraphData";
import PortfolioPlaceHolder from './PortfolioPlaceHolder';
import { useTranslation } from 'react-i18next';


const PortfolioMainGraph = ({portfolio}) => { 

  const {t} = useTranslation();

  const [isReady, setIsReady] = React.useState(false);
  const [elec, setElec] = React.useState([]);
  const [water, setWater] = React.useState([]);
  const [gaz, setGaz] = React.useState([]);
  const [view, setView] = React.useState("ELEC");

  useEffect(()=>{
    
      if (portfolio.ELEC !== undefined) {
        setElec(portfolio.ELEC.map((item)=>{
          return {...item, energy: "ELEC"}
        }))
      } else {
        setElec([])
      }
  
      if (portfolio.WATER !== undefined) {
        setWater(portfolio.WATER.map((item)=>{
          return {...item, energy: "WATER"}
        }))
      } else {
        setWater([])
      }
  
      if (portfolio.GAZ !== undefined) {
        setGaz(portfolio.GAZ.map((item)=>{
          return {...item, energy: "GAZ"}
        }))
      } else {
        setGaz([])
      }
      
      setIsReady(true);
      
 }, [portfolio]);

 console.log(gaz)

 
  return (
  <Stack justifyContent='center'  alignContent="center" alignItems='center' sx={{height:"80%", width:"80%"}}>
    {isReady ? <Card sx={{boxShadow:'none'}}>
      <Typography variant="h6">
        {view === "ELEC" ? t('elec_cons') : view === "WATER" ? t('water_cons') : t('gas_cons')}
      </Typography>
      <CardContent sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      
      {view === "ELEC" ?  <LineChart
        width={700}
        height={500}
        data={elec}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  dataKey='value'/>
        <Tooltip />
        <Line type="monotone" dataKey="value" name={t('cons_kwh')} stroke="red" />
        <Legend />
      </LineChart>
       : view === "WATER" ? 
       <LineChart
        width={700}
        height={500}
        data={water}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  dataKey='value' />
        <Tooltip />
        <Line type="monotone" dataKey="value" name={t('cons_m3')} stroke="blue" />
        <Legend />
      </LineChart>
       : 
       <LineChart
        width={700}
        height={500}
        data={gaz}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis  dataKey='value' />
        <Tooltip />
        <Line type="monotone" dataKey="value" name={t('cons_kwh')} stroke="green" />
        <Legend />
      </LineChart>}
        
      </CardContent>
      
      
        </Card>
         : <CircularProgress/>}
        {isReady ? <ButtonGroup variant='contained' sx={{mt:1}}>
          <Button onClick={() => setView("ELEC")}>{t('elec')}</Button>
          <Button onClick={() => setView("WATER")}>{t('water')}</Button>
          <Button onClick={() => setView("GAZ")}>{t('gas')}</Button>
        </ButtonGroup> : null }
      </Stack>
    );
}

export default PortfolioMainGraph