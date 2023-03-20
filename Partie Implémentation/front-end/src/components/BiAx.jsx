import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ConsPerWeek as dataWeek, consPerDay as dataDay, ConsPerMonth as dataMonth} from '../resources/demo-data';

export default class BiAx extends PureComponent {
  render() {
    const { scale, showGas, showWater, showElec } = this.props;

    switch (scale) {
      case "day":
        const data = dataDay;
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


/*
    return (
      //<Card sx={{boxShadow:'5px 5px 5px #A9A9A9'}}>
      <ResponsiveContainer width={600} height="60%">
        <LineChart
        width={500}
        height={300}
        data={dataWeek}
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

          {(showElec &&
          <Line yAxisId="left" name="Electicity Cons." type="monotone" dataKey="elec" stroke="#8884d8" strokeWidth={4}  activeDot={{ r: 8 }} />
          )}
          {(showGas &&
          <Line yAxisId="left"  name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={4}  activeDot={{ r: 8 }} />
          )}
          {(showWater &&
          <Line yAxisId="right"  name="Water Cons." type="monotone" dataKey="water" stroke="#82ca9d" strokeWidth={4} strokeDasharray="16 2" activeDot={{ r: 8 }}/>
          )}
        </LineChart>
      </ResponsiveContainer>
      //</Card>
    );
  }
  */
}


/*
export const BiAxLineChart = (water, elec, gas, scale) => {
  const dataMin = 0;
  const dataMax = 100000;
  const data1 = dataWeek;

  switch (scale) {
    case "week":
      const data = data1;

      return (
        <ResponsiveContainer width={600} height="60%">
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
            <XAxis dataKey={scale} hide={false} />
            <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} allowDecimals={false} />
            <YAxis yAxisId="right" orientation="right" domain={[dataMin, dataMax]} allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign='top' />
            <Line yAxisId="left" hide={!elec} name="Electicity Cons."  type="monotone" dataKey="elec" stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
            <Line yAxisId="left" hide={!gas} name="Gas Cons." type="monotone" dataKey="gas" stroke="#E29B3F" strokeWidth={4} activeDot={{ r: 8 }} />
            <Line yAxisId="right" hide={!water} name="Water Cons." type="monotone" dataKey="water" stroke="#82ca9d" strokeWidth={4} strokeDasharray="16 2" activeDot={{ r: 8 }}/>
          </LineChart>
        </ResponsiveContainer>
      );

    case "day":
      data1 = dataDay;
      break;
    case "month":
      data1 = dataMonth;
      break;
    default:
      data1 = data1;
      break;
  }
  */

  /*
    return (

        <ResponsiveContainer width={600} height="60%">
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
            <XAxis dataKey={scale} hide={false} />
            <YAxis yAxisId="left" domain={['dataMin', 'dataMax']} allowDecimals={false} />
            <YAxis yAxisId="right" orientation="right" domain={[dataMin, dataMax]} allowDecimals={false} />
            <Tooltip />
            <Legend verticalAlign='top' />
            <Line yAxisId="left" name="Electicity Cons." type="monotone" dataKey={elec} stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
            <Line yAxisId="left" name="Gas Cons." type="monotone" dataKey={gas} stroke="#E29B3F" strokeWidth={4} activeDot={{ r: 8 }} />
            <Line yAxisId="right" name="Water Cons." type="monotone" dataKey={water} stroke="#82ca9d" strokeWidth={4} strokeDasharray="16 2" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
    ); 
}
*/