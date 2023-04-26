import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { ConsPerWeek as dataWeek, ConsPerMonth as dataMonth, ConsPerDay as dataDay } from '../resources/demo-data';


export default function BiAx ({ switchesChecked, scale }) {
  let data;
  let XAxisVis = true;

  switch (scale) {
    case "day":
      data = dataDay;
      break;
    case "week":
      data = dataWeek;
      break;
    case "month":
    default:
      data = dataMonth;
      XAxisVis = false;
      break;
  }

  return (
    <ResponsiveContainer width="90%" height="80%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey={scale} hide={XAxisVis} />

        <YAxis yAxisId="left" domain={[dataMin => (dataMin * 0.9).toFixed(0), dataMax => (dataMax * 1.1).toFixed(0)]} tickCount={6} unit=' kWh' />

        <YAxis yAxisId="right" orientation="right" domain={[dataMin => (dataMin * 0.95).toFixed(0), dataMax => (dataMax * 1.05).toFixed(0)]} tickCount={6} unit=' Ltrs' />
        <Tooltip />
        <Legend verticalAlign='top' />

        {(switchesChecked.elecSwitch &&
          <Line yAxisId="left" isAnimationActive={false} dot={false} name="Electicity Cons." type="monotone" dataKey="elec" stroke="#82ca9d" strokeWidth={3} activeDot={{ r: 2 }} />
        )}

        {(switchesChecked.gasSwitch &&
          <Line yAxisId="left" isAnimationActive={false} dot={false} name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={3} activeDot={{ r: 2 }} />
        )}

        {(switchesChecked.waterSwitch &&
          <Line yAxisId="right" isAnimationActive={false} dot={false} name="Water Cons." type="monotone" dataKey="water" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 2 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}