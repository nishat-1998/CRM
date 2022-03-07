import React,{useState} from 'react';
import Axios from 'axios';
import {CircularProgress,Collapse} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
    KeyboardDatePicker,
   MuiPickersUtilsProvider,
   KeyboardTimePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
  import {TextField,
          Grid,
          Button    
                   }
   from '@material-ui/core';
   import { useParams } from 'react-router-dom';
const moment = require('moment-timezone');

export default function Appointment(props){
  const {customerId} = props;
    const [selectedDate, setSelectedDate] =  React.useState((moment().format('YYYY-MM-DD')));
    const [selectedTime, setSelectedTime] =  React.useState((moment().format('YYYY-MM-DD HH:mm')));
    const [mode,setMode] = useState('');
const [description, setDescription] = React.useState('');
const [employee_id,setEmployee_id] = useState('NULL');
const [manager_id,setManager_id] = useState('NULL');
const {role} = useParams();
  const {id} = useParams();
  
  const [open, setOpen] = React.useState(false);
  const handleDateChange = (date) => {
    var dates = moment(date).format('YYYY-MM-DD');
    setSelectedDate(dates);
  };
  const handleTimeChange = (date) => {
    var dates = moment(date).format();
    setSelectedTime (dates);
  }


  //Adding new appointment, Refer appointment.js in backend
  const submit = (e)=>{
    setOpen(true);
    e.preventDefault();
    Axios.post("http://161.97.79.224:3001/appointment/customer",{
      
      mode: mode,
      date:selectedDate,
      time:selectedTime,
      customerId:customerId,
      managerId:manager_id,
      employeeId:employee_id ,
      description:description
    }).then((response)=> {
      if(response.data.message === "err"){
       
        alert(response.data.message)
      }else{
      alert("Successful")
      setOpen(false);
      }
     
    });
    setMode("")
    setDescription("")
   
   
  }
    return(
        <div>
             <form autoComplete="off" onSubmit={submit}>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          required
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          onError={console.log}
          disablePast
          helperText="Please enter Date on which appointment is scheduled"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       
        <KeyboardTimePicker
          margin="normal"
          required
          id="time-picker"
          label="Time picker"
          mask="__:__ _M"
          value={selectedTime}
          helperText="Please enter time on which appointment is scheduled"
          onChange={handleTimeChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
        <TextField required id="standard-required" label="Mode" defaultValue="" 
     value={mode}
     style={{ margin: 10 }}
     placeholder="None"
     helperText="Please enter Mode of appointment"
    
     margin="normal"
     InputLabelProps={{
       shrink: true,
     }}
    
     onChange={(e)=>{ setMode(e.target.value)
      //Setting user id
      if(role === "manager"){
        setManager_id(id);
      }else if(role === "employee"){
        setEmployee_id(id);
      }
      console.log(manager_id)
      console.log(employee_id)
    
    
    }}
    />
      </Grid>
    </MuiPickersUtilsProvider>
    
    <TextField
          id="Description"
          label="Description"
          value={description}
          style={{ margin: 10 }}
          placeholder="None"
          helperText="Please enter Description about Appointment"
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setDescription(e.target.value)}}
        />
       <Collapse in={open}>
             
             <Alert
             style={{marginBottom:20,marginTop:20}}
             severity="error"
               action={
                <CircularProgress color="inherit"/>
               }
             >
               loading...
             </Alert>
           
           </Collapse>
         <Button variant="contained" style={{marginBottom:20,marginTop:20}} color="primary" type="submit">
        Submit
      </Button>
      </form>
     
</div>
    )
}