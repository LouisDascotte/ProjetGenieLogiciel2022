import { NaturePeople } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Grid, Checkbox, Switch, Typography, RadioGroup, FormControl, Radio } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { ConsPerWeek as dataWeek, consPerDay as dataDay, ConsPerMonth as dataMonth} from '../resources/demo-data';


export default function ChartFooter() {

  const stats = GasData(dataWeek);
  const mean=stats.mean , max= stats.max, stdev = stats.stdev, min = stats.min;
  const theme = createTheme({
    palette: {
      primary: {
        main: '#9bcc6c',
      },
    },
  });


    return (
      <ThemeProvider theme={theme}>
        <Grid container direction='row'
        justifyContent="center"
        alignItems="center" >
          <Grid item container xs={4} md={4} rowSpacing={2} >
            <Grid item >
              {/* Gas convert */}
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked={false} color='primary' />} label='Gas in m³' labelPlacement='end' />
              </FormGroup>
            </Grid>
            <Grid item container 
            direction='column' 
            alignItems='left'
            >
              {/* Energy stats */}
              <Grid item xs={6} >
                <Typography variant='body2'>Mean: {mean.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='body2'>STDEV: {stdev.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='body2'>Max : {max}</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='body2'>Min : {min}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} md={4} >
            <FormControl>
              <RadioGroup 
              aria-label='Data Show'
              name='Data Show'
              defaultValue='real'
              >
                <FormControlLabel value='real' control={<Radio defaultChecked={true} color='primary' />} label='Real Data' labelPlacement='end' />
                <FormControlLabel value='estidata' control={<Radio defaultChecked={false} color='primary' />} label='Estimated Data' labelPlacement='end' />
                <FormControlLabel value='recaldata' control={<Radio defaultChecked={false} color='primary' />} label='Recalculated Data' labelPlacement='end' />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={4} md={4} >
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked={true} color='primary' size="small" />} label='Water Consumption' labelPlacement='end' />
              <FormControlLabel control={<Switch defaultChecked={true} color='primary' size="small" />} label='Electricity Consumption' labelPlacement='end' />
              <FormControlLabel control={<Switch defaultChecked={true} color='primary' size="small" />} label='Gas Consumption' labelPlacement='end' />
            </FormControl>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
}



function GasData(data) {
  //Only get the gas values
  const gasValues = data.map((d) => d.gas);

  //Calculate the stats
  const gasMin = Math.min(...gasValues);
  const gasMax = Math.max(...gasValues);
  const gasMean = gasValues.reduce((acc, cur) => acc + cur, 0) / gasValues.length;
  const gasStdev = Math.sqrt(gasValues.reduce((acc, cur) => acc + (cur - gasMean) ** 2, 0) / gasValues.length);

  return {gasMin, gasMax, gasMean, gasStdev};
}

function ElecData(data) {
  //Only get the elec values
  const elecValues = data.map((d) => d.elec);

  //Calculate the stats
  const elecMin = Math.min(...elecValues);
  const elecMax = Math.max(...elecValues);
  const elecMean = elecValues.reduce((acc, cur) => acc + cur, 0) / elecValues.length;
  const elecStdev = Math.sqrt(elecValues.reduce((acc, cur) => acc + (cur - elecMean) ** 2, 0) / elecValues.length);

  return {elecMin, elecMax, elecMean, elecStdev};
}

function WaterData(data) {
  //Only get the water values
  const waterValues = data.map((d) => d.water);

  //Calculate the stats
  const waterMin = Math.min(...waterValues);
  const waterMax = Math.max(...waterValues);
  const waterMean = waterValues.reduce((acc, cur) => acc + cur, 0) / waterValues.length;
  const waterStdev = Math.sqrt(waterValues.reduce((acc, cur) => acc + (cur - waterMean) ** 2, 0) / waterValues.length);

  return {waterMin, waterMax, waterMean, waterStdev};
}