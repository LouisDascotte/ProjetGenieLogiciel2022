import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Stack, Card, Grid } from '@mui/material';
import  {datas} from "../resources/hardcodedGraphData";
import PortfolioPlaceHolder from './PortfolioPlaceHolder';


const PortfolioMainGraph = (portfolio) => { 
  let name = JSON.stringify(portfolio);
  var port = JSON.parse(name); 
  const dataset = datas.find(obj => obj.id == port.portfolio);
  
  return (
  <Stack direction='row' justifyContent='center' paddingTop='10%'>
    {dataset.id == "/" ? <PortfolioPlaceHolder/> : <Card sx={{boxShadow:'5px 5px 5px #A9A9A9'}}>
        <BarChart
          width={700}
          height={500}
          data={dataset.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
        </Card>}
    
      
      </Stack>
    );
}

export default PortfolioMainGraph