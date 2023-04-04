import { NaturePeople } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Grid, Checkbox, Switch, Typography, RadioGroup, FormControl, Radio, Select } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { ConsPerWeek as dataWeek, ConsPerDay as dataDay, ConsPerMonth as dataMonth, ConsPerDay2 as dataD1, ConsPerDay3 as dataD2} from '../resources/demo-data';
import { useState } from "react";
import ChartStats from "./ChartStats";


export default function ChartFooter({ switchesChecked, onSwitchChange, scale }) {

  const [energyChoice, setEnergyChoice] = useState('elec');

  const setEnergyChosen = (e) => {
    const energyChoice = e.target.value;
    setEnergyChoice(energyChoice);
  };

    return (

      <Grid container
      direction='row'
      justifyContent="center"
      alignItems="center"
      //blue
      >

        <Grid item container
        direction='column'
        justifyContent="center"
        alignItems="center"
        xs={8}
        //black
        >

          <Grid item container
          direction='row'
          justifyContent="center"
          alignItems="center"
          //red
          >

            <Grid item
            xs={6}
            //Select 1
            >
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
          </Grid>

          <Grid item container
          direction='column'
          justifyContent="center"
          alignItems="center"
          //green
          >
            <Grid item
            xs={12}
            //Stats
            >
              <ChartStats nrj={energyChoice} scale={scale} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item container
        direction='column'
        justifyContent="left"
        alignItems="center"
        xs={4}
        //red
        >
          <Grid item
          xs={12}
          >
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked={true} checked={switchesChecked.waterSwitch} onChange={(e) => onSwitchChange("waterSwitch", e.target.checked)} color='primary' size="small"  />} label='Water Cons' labelPlacement='end' />

              <FormControlLabel control={<Switch defaultChecked={true} checked={switchesChecked.elecSwitch} onChange={(e) => onSwitchChange("elecSwitch", e.target.checked)} color='primary' size="small" />} label='Electricity Cons' labelPlacement='end' />

              <FormControlLabel control={<Switch defaultChecked={true} checked={switchesChecked.gasSwitch} onChange={(e) => onSwitchChange("gasSwitch", e.target.checked)} color='primary' size="small" />} label='Gas Cons' labelPlacement='end' />
              
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    );
}