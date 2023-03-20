import { NaturePeople } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Grid, Checkbox, Switch, Typography, RadioGroup, FormControl, Radio } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";


export default function ChartFooter() {

  const min=132 , max= 564, stdev = 2.4, mean = 230;
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
              {/* Gas stats */}
              <Grid item xs={6} >
                <Typography variant='body2'>Mean: {mean}</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography variant='body2'>STDEV: {stdev}</Typography>
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