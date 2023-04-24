import React, { PureComponent , useEffect} from 'react';
import { BarChart, LineChart, Line,  Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stack, CircularProgress, Card, Grid, Typography, ButtonGroup, Button } from '@mui/material';
import  {datas} from "../resources/hardcodedGraphData";
import PortfolioPlaceHolder from './PortfolioPlaceHolder';


const PortfolioMainGraph = ({portfolio}) => { 

  console.log(portfolio)

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

 /*const result = data.reduce((acc, curr) => {
  const date = curr.date;
  const energy = curr.energy.toLowerCase();

  // initialise l'objet s'il n'existe pas encore pour cette date
  if (!acc[date]) {
    acc[date] = {
      date: date,
      elec: 0,
      gaz: 0
    }
  }

  // met à jour la valeur de la consommation pour l'énergie donnée
  acc[date][energy] += curr.value;

  return acc;
  }, {})

  const chartData = Object.values(result).map(item => ({
    date: item.date,
    electricity: item.elec,
    gas: item.gaz
  }));

 console.log(chartData)*/

 
  return (
  <Stack justifyContent='center' paddingTop='10%' alignContent="center" alignItems='center'>
    {isReady ? <Card sx={{boxShadow:'none', textAlign:'center'}}>
      <Typography variant="h6">
        {view === "ELEC" ? "Electricity consumption" : view === "WATER" ? "Water consumption" : "Gas consumption"}
      </Typography>
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
        <YAxis  dataKey='value' />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="red" />
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
        <Line type="monotone" dataKey="value" stroke="red" />
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
        <Line type="monotone" dataKey="value" stroke="red" />
        <Legend />
      </LineChart>}
        
        </Card>
         : <CircularProgress/>}
        {isReady ? <ButtonGroup variant='contained' sx={{mt:1}}>
          <Button onClick={() => setView("ELEC")}>Electricity</Button>
          <Button onClick={() => setView("WATER")}>Water</Button>
          <Button onClick={() => setView("GAZ")}>Gas</Button>
        </ButtonGroup> : null }
      </Stack>
    );
}

export default PortfolioMainGraph