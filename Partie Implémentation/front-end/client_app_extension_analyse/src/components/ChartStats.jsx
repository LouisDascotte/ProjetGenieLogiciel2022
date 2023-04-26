import React from "react";
import { Grid, Typography, Box, Tooltip } from "@mui/material";
import { ConsPerDay as dataDay, ConsPerWeek as dataWeek, ConsPerMonth as dataMonth } from "../resources/demo-data";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function GasData(data) {
  //Only get the gas values
  const gasValues = data.map((d) => d.gas);

  //Calculate the stats
  const Min = Math.min(...gasValues);
  const Max = Math.max(...gasValues);
  const Mean = (gasValues.reduce((acc, cur) => acc + cur, 0) / gasValues.length).toFixed(2);
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
    const Mean = (elecValues.reduce((acc, cur) => acc + cur, 0) / elecValues.length).toFixed(2);
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
  const Mean = (waterValues.reduce((acc, cur) => acc + cur, 0) / waterValues.length).toFixed(2);
  const temp = (Math.sqrt(waterValues.reduce((acc, cur) => acc + (cur - Mean) ** 2, 0) / waterValues.length));
  const Stdev = (temp / Mean * 100).toFixed(2);

  return {Min, Max, Mean, Stdev};
}

const ChartStats = ({nrj, scale}) => {

  const nrjData = {Min: 0, Max: 0, Mean: 0, Stdev: 0, Unit: ''};

  switch (nrj) {
    case "gas": 
      let gasD = GasData(dataDay);
      if (scale === 'day') {
        gasD = GasData(dataDay);
      } else if (scale === 'week') {
        gasD = GasData(dataWeek);
      } else if (scale === 'month') {
        gasD = GasData(dataMonth);
      }
      nrjData.Max = gasD.Max;
      nrjData.Min = gasD.Min;
      nrjData.Mean = gasD.Mean;
      nrjData.Stdev = gasD.Stdev;
      nrjData.Unit = "kWh";
      break;
    case "elec":
      let elecD= ElecData(dataDay);
      if (scale === 'day') {
        elecD = ElecData(dataDay);
      } else if (scale === 'week') {
        elecD = ElecData(dataWeek);
      } else if (scale === 'month') {
        elecD = ElecData(dataMonth);
      }
      nrjData.Max = elecD.Max;
      nrjData.Min = elecD.Min;
      nrjData.Mean = elecD.Mean;
      nrjData.Stdev = elecD.Stdev;
      nrjData.Unit = "kWh";
      break;
    case "water":
    default:
      let waterD= WaterData(dataDay);
      if (scale === 'day') {
        waterD = WaterData(dataDay);
      } else if (scale === 'week') {
        waterD = WaterData(dataWeek);
      } else if (scale === 'month') {
        waterD = WaterData(dataMonth);
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
    direction='row'
    columnSpacing={2}
    >
      <Grid item container
      xs='auto'
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      rowSpacing={1}
      >
        <Grid item container 
        xs='12'
        direction="row"
        columnSpacing={1}
        >
          <Grid item xs='auto' >
            <Tooltip title={<h3>The mean represents the typical amount of energy used over a given time period.</h3> } placement="top" enterDelay={200} leaveDelay={200}  >
              <InfoOutlinedIcon fontSize="8" />
            </Tooltip>
          </Grid>
          <Grid item xs='auto' >
            <Typography variant='body2'> Mean: {nrjData.Mean} {nrjData.Unit} </Typography>
          </Grid>
        </Grid>
        <Grid item container
        xs='12'
        direction="row"
        columnSpacing={1}
        >
          <Grid item xs='auto' >
            <Tooltip title={<h3> The STDEV measures how spread out data is from the mean, it indicates the degree of variability. A high % means high variability and a low % means low variability.</h3> } placement="top" enterDelay={200} leaveDelay={200} >
              <InfoOutlinedIcon fontSize="8" />
            </Tooltip>
          </Grid>
          <Grid item xs='auto' >
            <Typography variant='body2'> STDEV: {nrjData.Stdev}% </Typography>
          </Grid>
        </Grid>  
      </Grid>
      <Grid item container
      xs='auto'
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      rowSpacing={1}
      >
        <Grid item xs='auto' >
          <Typography variant='body2'>Max : {nrjData.Max} {nrjData.Unit} </Typography>
        </Grid>
        <Grid item xs='auto' >
          <Typography variant='body2'>Min : {nrjData.Min} {nrjData.Unit} </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ChartStats;