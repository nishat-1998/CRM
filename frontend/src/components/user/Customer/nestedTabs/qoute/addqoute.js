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

//material ui Icons
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

   //external files
import Message from './Message';
import Progress from './Progress';
import { useParams } from 'react-router-dom';
const moment = require('moment-timezone');

export default function Appointment(props){
  const {customerId} = props;
    const [selectedDate, setSelectedDate] =  React.useState((moment().format('YYYY-MM-DD')));
    const [selectedTime, setSelectedTime] =  React.useState((moment().format('YYYY-MM-DD HH:mm')));
    
const [description, setDescription] = React.useState('');
const [employee_id,setEmployee_id] = useState('NULL');
const [manager_id,setManager_id] = useState('NULL');
const {role} = useParams();
  const {id} = useParams();
  const [file, setFile] = useState('');
  const [fileName,setFileName] = useState('No file choosen');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [value,setValue] = useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [open, setOpen] = React.useState(false);
 
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    setOpenUpload(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await Axios.post('http://161.97.79.224:3001/invoice/uploadInvoice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const filePath  = res.data.filePath;

      setUploadedFile(filePath);

      setMessage('File Uploaded');
      setValue(true)
      setOpenUpload(false);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
    setOpenUpload(false);
  };

const handleDateChange = (date) => {
    var dates = moment(date).format('YYYY-MM-DD');
    setSelectedDate(dates);
  };
  const handleTimeChange = (date) => {
    var dates = moment(date).format();
    setSelectedTime (dates);
  }
 
  //Adding new invoice, Refer invoice.js in backend
  const submit = (e)=>{
    e.preventDefault();
    setOpen(true);
    Axios.post("http://161.97.79.224:3001/qoute/insertQoute",{
      path: uploadedFile,
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
      setValue(false)
      }
     
    });
   
    setDescription("")
    
  }
    return(
        <div>
  
      {message ? <Message msg={message} /> : null}
      <Grid  container
        direction="row"
        justify="space-evenly"
        alignItems="center">
        <input
         style={ {
          display: 'none',
        }}
        id="contained-button-file"
        type="file" accept="application/pdf"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button  color="primary" size="small" startIcon={<AttachFileIcon />} component="span">
          choose file
        </Button>
        {fileName}
       </label>
        <Progress percentage={uploadPercentage} />

        {
    value === false?
    <Button  color="primary" size="small" variant="contained" startIcon={<CloudUploadIcon />} onClick={onSubmit} component="span">
    Upload
  </Button>:
  <></>
  }
      </Grid>
      <Collapse in={openUpload}>
             
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
      {value ?  
      <div>
         <form autoComplete="off" onSubmit={submit}>
      <MuiPickersUtilsProvider style={{margin:20}} utils={DateFnsUtils}>
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
        <Collapse in={open}>
             
             <Alert
             severity="error"
             style={{marginBottom:20,marginTop:20}}
               action={
                <CircularProgress color="inherit"/>
               }
             >
               loading...
             </Alert>
           
           </Collapse>
         <Button variant="contained" size='small' color="primary" type="submit">
        Submit
      </Button>
      </form>
     
      </div>
      : null}
</div>
    )
}
