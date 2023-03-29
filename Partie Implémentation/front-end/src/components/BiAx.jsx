import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { ConsPerWeek as dataWeek, ConsPerDay as dataDay, ConsPerMonth as dataMonth, ConsPerDay2 as dataD1, ConsPerDay3 as dataD2} from '../resources/demo-data';


export default function BiAx ({ switchesChecked, scale }) {
  let data;

  switch (scale) {
    case "day":
      data = dataD1;
      break;
    case "week":
      data = dataWeek;
      break;
    case "month":
    default:
      data = dataMonth;
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
        <XAxis dataKey={scale} hide={true} />
        <YAxis yAxisId="left" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]} allowDecimals={false} />
        <YAxis yAxisId="right" orientation="right" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]} allowDecimals={false} />
        <Tooltip />
        <Legend verticalAlign='top' />

        {(switchesChecked.elecSwitch &&
          <Line yAxisId="left" isAnimationActive={false} dot={false} name="Electicity Cons." type="monotone" dataKey="elec" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 2 }} />
        )}

        {(switchesChecked.gasSwitch &&
          <Line yAxisId="left" isAnimationActive={false} dot={false} name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={2} activeDot={{ r: 2 }} />
        )}

        {(switchesChecked.waterSwitch &&
          <Line yAxisId="right" isAnimationActive={false} dot={false} name="Water Cons." type="monotone" dataKey="water" stroke="#8884d8" strokeWidth={2} strokeDasharray="16 2" activeDot={{ r: 2 }} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}