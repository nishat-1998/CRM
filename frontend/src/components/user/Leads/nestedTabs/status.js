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
          Button,
          MenuItem   
                   }
   from '@material-ui/core';
   import { useParams } from 'react-router-dom';
const moment = require('moment-timezone');

const Status = [
  {
    value: 1,
    label: 'Initial Approach',
  },
  {
    value: 2,
    label: 'Proposal',
  },
  {
    value: 3,
    label: 'Demo',
  },
  {
    value: 4,
    label: 'Final approach',
  },
  {
    value: 5,
    label: 'Successful',
  },
  {
    value: 6,
    label: 'Unsuccessful',
  },

];

export default function Appointment(props){
  const {leadsId} = props;
    const [selectedDate, setSelectedDate] =  React.useState((moment().format('YYYY-MM-DD')));
    const [selectedTime, setSelectedTime] =  React.useState((moment().format("YYYY-MM-DD HH:mm")));
    const [mode,setMode] = useState('');
    const [status, setStatus] = React.useState('Initial Approach');
const [description, setDescription] = React.useState('');
const [employee_id,setEmployee_id] = useState('NULL');
const [manager_id,setManager_id] = useState('NULL');

const [open, setOpen] = React.useState(false);
const {role} = useParams();
  const {id} = useParams();
  const handleDateChange = (date) => {
    var dates = moment(date).format('YYYY-MM-DD');
    setSelectedDate(dates);
  };
  const handleTimeChange = (date) => {
    var dates = moment(date).format();
    setSelectedTime (dates);
  }


   //Refer status.js in backend
  const submit = (e)=>{
    e.preventDefault();
    setOpen(true);
    Axios.post("http://161.97.79.224:3001/status/leads",{
      mode: mode,
      status:status,
      date:selectedDate,
      time:selectedTime,
      leadId:leadsId,
      managerId:manager_id,
      employeeId:employee_id ,
      description:description
    }).then((response)=> {
      if(response.data.message === "err"){
       
        alert(response.data.message)
      }else{
      alert("Successful")
      update()
          setOpen(false);
      }
     
    });
    setMode("")
    setDescription("")
  }
  //Refer status.js in backend
  const update= ()=>{
    
    Axios.put("http://161.97.79.224:3001/status/updatestatus",{
      leadId:leadsId,
    status:status,
    }).then((response)=> {
        console.log(response.data)
     alert('Updated');
    });
    if(status === 'Successful'){
      uploadToCustomer()
    }
   
  }
//Lead with successfull status convert into customer
  const uploadToCustomer= ()=>{
    
    Axios.post("http://161.97.79.224:3001/status/uploadToCustomer",{
      leadId:leadsId,
      date:moment().format('YYYY-MM-DD HH:mm'),
      managerId:manager_id,
      employeeId:employee_id
    }).then((response)=> {
        console.log(response.data)
     alert('Lead converted into customer');
   
    });
  }


    return(
        <div>
           <form  autoComplete="off" onSubmit={submit}>
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
       
      </Grid>
    </MuiPickersUtilsProvider>
    <Grid container justify="space-around">
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
      console.log(leadsId)
    
    }}
    />
     <TextField
          id="demo-simple-select-placeholder-label"
          select
          required
          value={status}
          label="Status"
          onChange={(e)=>{ setStatus(e.target.value)}}
          helperText="Please select the status"
        >
          {Status.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
          </TextField>
          </Grid>
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
          onChange={(e)=>{ setDescription(e.target.value)
            if(role === "manager"){
              setManager_id(id);
            }else if(role === "employee"){
              setEmployee_id(id);
            }
            console.log(manager_id)
            console.log(employee_id)
            
          
          }}
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
         <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
     
      </form>
</div>
    )
}
