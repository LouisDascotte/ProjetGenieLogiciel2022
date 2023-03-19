import { Grid, Typography } from '@mui/material';
import {React, useState} from 'react';
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

{/* npm install react-datepicker --save */}


const DatePickers = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
        <Grid container
        direction='row'
        alignItems='center'
        justifyContent='space-evenly'
        >
            <Grid item>
                <Typography variant="h6" component="div" gutterBottom> From: </Typography>
            </Grid>
            <Grid item>           
            </Grid>
            <Grid item>
                <Typography variant="h6" component="div" gutterBottom> To: </Typography>
            </Grid>
            
        </Grid>
    );
}

export default DatePickers