import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ConsPerWeek as data1} from '../resources/demo-data';
import { Card } from '@mui/material';

export default class BiAx extends PureComponent {

  render() {
    return (
      //<Card sx={{boxShadow:'5px 5px 5px #A9A9A9'}}>
        <ResponsiveContainer width="90%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={data1}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="week" hide={false} />
            <YAxis yAxisId="left" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]} allowDecimals={false} />
            <YAxis yAxisId="right" orientation="right" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]} allowDecimals={false}/>
            <Tooltip />
            <Legend verticalAlign='top' />
            <Line yAxisId="left" name="Electicity Cons." type="monotone" dataKey="elec" stroke="#8884d8" strokeWidth={4}  activeDot={{ r: 8 }} />
            <Line yAxisId="left"  name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={4}  activeDot={{ r: 8 }} />
            <Line yAxisId="right"  name="Water Cons." type="monotone" dataKey="water" stroke="#82ca9d" strokeWidth={4} strokeDasharray="16 2" activeDot={{ r: 8 }}/>
          </LineChart>
        </ResponsiveContainer>
      //</Card>
    );
  }
}
