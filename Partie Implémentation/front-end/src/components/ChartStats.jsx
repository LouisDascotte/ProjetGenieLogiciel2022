import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ConsPerDay2 as dataD1, ConsPerWeek as dataD2, ConsPerMonth as dataD3 } from "../resources/demo-data";

function GasData(data) {
  //Only get the gas values
  const gasValues = data.map((d) => d.gas);

  //Calculate the stats
  const Min = Math.min(...gasValues);
  const Max = Math.max(...gasValues);
  const Mean = (gasValues.reduce((acc, cur) => acc + cur, 0) / gasValues.length).toFixed(0);
  const temp = (Math.sqrt(gasValues.reduce((acc, cur) => acc + (cur - Mean) ** 2, 0) / gasValues.length));
  const Stdev = (temp / Mean * 100).toFixed(2);

  return {Min, Max, Mean, Stdev};
}

function ElecData(data) {
    //Only get the elec values
    const elecValues = data.map((d) => d.elec);
  
    //Calculate the stats
    const Min = Math.min(...elecValues);
    const Max = Math.max(...elecValues);
    const Mean = (elecValues.reduce((acc, cur) => acc + cur, 0) / elecValues.length).toFixed(0);
    const temp =(Math.sqrt(elecValues.reduce((acc, cur) => acc + (cur - Mean) ** 2, 0) / elecValues.length));
    const Stdev = (temp / Mean * 100).toFixed(2);
  
    return {Min, Max, Mean, Stdev};
}
  
function WaterData(data) {
  //Only get the water values
  const waterValues = data.map((d) => d.water);

  //Calculate the stats
  const Min = Math.min(...waterValues);
  const Max = Math.max(...waterValues);
  const Mean = (waterValues.reduce((acc, cur) => acc + cur, 0) / waterValues.length).toFixed(0);
  const temp = (Math.sqrt(waterValues.reduce((acc, cur) => acc + (cur - Mean) ** 2, 0) / waterValues.length));
  const Stdev = (temp / Mean * 100).toFixed(2);

  return {Min, Max, Mean, Stdev};
}

const ChartStats = ({nrj, scale}) => {

  const nrjData = {Min: 0, Max: 0, Mean: 0, Stdev: 0, Unit: ''};

  switch (nrj) {
    case "gas": 
      let gasD = GasData(dataD1);
      if (scale === 'day') {
        gasD = GasData(dataD1);
      } else if (scale === 'week') {
        gasD = GasData(dataD2);
      } else if (scale === 'month') {
        gasD = GasData(dataD3);
      }
      nrjData.Max = gasD.Max;
      nrjData.Min = gasD.Min;
      nrjData.Mean = gasD.Mean;
      nrjData.Stdev = gasD.Stdev;
      nrjData.Unit = "kWh";
      break;
    case "elec":
      let elecD= ElecData(dataD1);
      if (scale === 'day') {
        elecD = ElecData(dataD1);
      } else if (scale === 'week') {
        elecD = ElecData(dataD2);
      } else if (scale === 'month') {
        elecD = ElecData(dataD3);
      }
      nrjData.Max = elecD.Max;
      nrjData.Min = elecD.Min;
      nrjData.Mean = elecD.Mean;
      nrjData.Stdev = elecD.Stdev;
      nrjData.Unit = "kWh";
      break;
    case "water":
    default:
      let waterD= WaterData(dataD1);
      if (scale === 'day') {
        waterD = WaterData(dataD1);
      } else if (scale === 'week') {
        waterD = WaterData(dataD2);
      } else if (scale === 'month') {
        waterD = WaterData(dataD3);
      }
      nrjData.Max = waterD.Max;
      nrjData.Min = waterD.Min;
      nrjData.Mean = waterD.Mean;
      nrjData.Stdev = waterD.Stdev;
      nrjData.Unit = "liters";
      break;
  }

  return (
    <Grid container
    alignItems='center'
    justifyContent='center'
    columnSpacing={2}
    rowSpacing={2}
    >
      <Grid item xs='auto' >
        <Typography variant='body2'>Mean: {nrjData.Mean} {nrjData.Unit} </Typography>
      </Grid>
      <Grid item xs='auto' >
        <Typography variant='body2'>Max : {nrjData.Max} {nrjData.Unit} </Typography>
      </Grid>
      <Box width='100%' />
      <Grid item xs='auto' >
        <Typography variant='body2'>STDEV: {nrjData.Stdev}% </Typography>
      </Grid>         
      <Grid item xs='auto' >
        <Typography variant='body2'>Min : {nrjData.Min} {nrjData.Unit} </Typography>
      </Grid>
    </Grid>
  );
}

export default ChartStats;