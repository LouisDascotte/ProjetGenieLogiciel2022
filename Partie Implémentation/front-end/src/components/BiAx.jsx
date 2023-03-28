import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { ConsPerWeek as dataWeek, ConsPerDay as dataDay, ConsPerMonth as dataMonth, ConsPerDay2 as dataD1, ConsPerDay3 as dataD2} from '../resources/demo-data';


export default class BiAx extends PureComponent {
  render() {
    const { scale, showGas, showWater, showElec } = this.props;

    switch (scale) {
      case "day":
        const data = dataD1;
        return (
          <ResponsiveContainer width="90%" height="60%">
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

              {(showElec &&
                <Line yAxisId="left" isAnimationActive={false} dot={false} name="Electicity Cons." type="monotone" dataKey="elec" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 2 }} />
              )}
              {(showGas &&
                <Line yAxisId="left" isAnimationActive={false} dot={false} name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={2} activeDot={{ r: 2 }} />
              )}
              {(showWater &&
                <Line yAxisId="right" isAnimationActive={false} dot={false} name="Water Cons." type="monotone" dataKey="water" stroke="#8884d8" strokeWidth={2} strokeDasharray="16 2" activeDot={{ r: 2 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case "week":
        const data1 = dataWeek;
        return (
          <ResponsiveContainer width="90%" height="60%">
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
              <XAxis dataKey={scale} hide={true} />
              <YAxis yAxisId="left" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]} allowDecimals={false} />
              <YAxis yAxisId="right" orientation="right" domain={[dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)]} allowDecimals={false} />
              <Tooltip />
              <Legend verticalAlign='top' />

              {(showElec &&
                <Line yAxisId="left" dot={false} name="Electicity Cons." type="monotone" dataKey="elec" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 2 }} />
              )}
              {(showGas &&
                <Line yAxisId="left" dot={false} name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={2} activeDot={{ r: 2 }} />
              )}
              {(showWater &&
                <Line yAxisId="right" dot={false} name="Water Cons." type="monotone" dataKey="water" stroke="#8884d8" strokeWidth={2} strokeDasharray="16 2" activeDot={{ r: 2 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        );

      case "month":
        const data2 = dataMonth;
        return (
          <ResponsiveContainer width="90%" height="60%">
            <LineChart
              width={500}
              height={300}
              data={data2}
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

              {(showElec &&
                <Line yAxisId="left" dot={false} name="Electicity Cons." type="monotone" dataKey="elec" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 2 }} />
              )}
              {(showGas &&
                <Line yAxisId="left" dot={false} name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={2} activeDot={{ r: 2 }} />
              )}
              {(showWater &&
                <Line yAxisId="right" dot={false} name="Water Cons." type="monotone" dataKey="water" stroke="#8884d8" strokeWidth={2} strokeDasharray="16 2" activeDot={{ r: 2 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
    
      default:
        break;


      }
    }
  }