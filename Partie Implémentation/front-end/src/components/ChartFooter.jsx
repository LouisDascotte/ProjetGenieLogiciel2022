import { NaturePeople } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Grid, Checkbox, Switch, Typography, RadioGroup, FormControl, Radio, Select } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { ConsPerWeek as dataWeek, ConsPerDay as dataDay, ConsPerMonth as dataMonth, ConsPerDay2 as dataD1, ConsPerDay3 as dataD2} from '../resources/demo-data';
import { useState } from "react";
import ChartStats from "./ChartStats";


export default function ChartFooter() {

  const [energyChoice, setEnergyChoice] = useState('elec');
  const [scaleChoice, setScaleChoice] = useState('day');
  const [waterVis, setWaterVis] = useState(true);
  const [elecVis, setElecVis] = useState(true);
  const [gasVis, setGasVis] = useState(true);

  const handleWaterChange = (event) => {
    setWaterVis(event.target.checked);
  };
  const handleElecChange = (event) => {
    setElecVis(event.target.checked);
  };
  const handleGasChange = (event) => {
    setGasVis(event.target.checked);
  };

  const setEnergyChosen = (e) => {
    const energyChoice = e.target.value;
    setEnergyChoice(energyChoice);
  };

  const setScaleChosen = (e) => {
    const scaleChoice = e.target.value;
    setScaleChoice(scaleChoice);
  };

    return (
      
        <Grid container direction='row'
        justifyContent="center"
        alignItems="center" >
          <Grid item container xs={2}
          rowSpacing={1}
          >
            <Grid item container
            direction={'row'}
            alignItems='center'
            >
              <Grid item container
              direction={'row'}
              alignItems='center' >
                <Grid item xs={6}>
                  <Select
                  native
                  labelId="energy-select-label"
                  id="energy-select"
                  label="Energy"
                  value={energyChoice}
                  onChange={setEnergyChosen}
                  variant='standard'
                  >
                    <option value='elec'>Electricity</option>
                    <option value='gas'>Gas</option>
                    <option value='water'>Water</option>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <Select
                  native
                  labelId="scale-select-label"
                  id="scale-select"
                  label="Scale"
                  value={scaleChoice}
                  onChange={setScaleChosen}
                  variant='standard'
                  >
                    <option value='day'>Day</option>
                    <option value='week'>Week</option>
                    <option value='month'>Month</option>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container 
            direction='column' 
            alignItems='left'
            columnSpacing={2}
            >
              <Grid item >
                <ChartStats nrj={energyChoice} scale={scaleChoice} />
              </Grid>
            </Grid>
          </Grid>
          
          <Grid item xs={3} >
            <FormControl>
              <FormControlLabel control={<Checkbox defaultChecked={true} checked={waterVis} onChange={handleWaterChange} color='primary' size="small"  />} label='Water Cons' labelPlacement='end' />
              <FormControlLabel control={<Checkbox defaultChecked={true} checked={elecVis} onChange={handleElecChange} color='primary' size="small" />} label='Electricity Cons' labelPlacement='end' />
              <FormControlLabel control={<Checkbox defaultChecked={true} checked={gasVis} onChange={handleGasChange} color='primary' size="small" />} label='Gas Cons' labelPlacement='end' />
            </FormControl>
          </Grid>
        </Grid>
    );
}