import React from 'react';
import Axios from 'axios';
//Material ui Styles
import { makeStyles } from '@material-ui/core/styles';

//Material ui core components
import {AppBar,Button,CssBaseline,MenuList,Grid,Typography,Avatar,TextField,Link, Toolbar,Paper,Backdrop,CircularProgress,Menu,MenuItem,FormControl,Select,InputLabel} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//Routing
import { Redirect} from 'react-router-dom';
//External files
import Countries from "../country"
//Defining styles
const useStyles = makeStyles(theme => ({
 
  grow: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  textField: {
    
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1), 
    width: '50%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
   
  paper: {
    paddingTop:theme.spacing(2),
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperMU: {
    paddingTop:theme.spacing(2),
    marginBottom:theme.spacing(20),
    marginLeft:theme.spacing(20),
    marginRight:theme.spacing(20),
    marginTop: theme.spacing(10),
  
  },
  title: {
    flexGrow: 1,
  },
}));





export default function Register(props) {
  const classes = useStyles();
  const [manager,setManager] = React.useState('') 
  const [department,setDepartment] = React.useState('') 
  const [first_name, setFirstName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [role, setRole] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState();
  const [ssn, setSsn] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [managerlist, setManagerList] = React.useState([])
  const [departmentlist, setDepartmentList] = React.useState([])
  const [stop, setStop] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [logstatus, setLogstatus] = React.useState('')
  const [accessPermission, setAccessPermission] = React.useState('');

 //HandleChange func for CircularProgress
  const handleClose = () => {
    setOpen(false);
  };

  //Function for submitting login detail
  const  handleToggle = (e)=>{
    e.preventDefault();
    //Setting open for circularProgress
    setOpen(!open);
    if (accessPermission === "access_2"){
      //Access level 2 Manager Registration based on dropdown selected by user 
    Axios.post("http://161.97.79.224:3001/register/manager",{
      first_name: first_name,
      mail:mail,
      phonenumber:phonenumber,
      ssn:ssn,
      company:company,
      role:role,
      department:department,
      country:country,
      password: password,
    }).then((response)=> {
      if(response.data.message === "err"){
       
        alert("User already exist")
      }else{
      alert("Successful")
      //Redirecting to access level 2 page using manager id from response
      setLogstatus(`manager/${response.data[0].idmanager}`)
      }
       //To stop the circularPrograss
      setStop(false)
  console.log(response)
    });
  }

else{
  //Access level 3 page, Others page
  Axios.post("http://161.97.79.224:3001/register/employee",{
    first_name: first_name,
    mail:mail,
    phonenumber:phonenumber,
    ssn:ssn, 
    company:company,
    role:role,
    manager:manager,
    password: password,
    department:department,
    country:country
  }).then((response)=> {
    if(response.data.message === "err"){
     
      alert("User already exist")
    }else{
    alert("Successful")
     //Redirecting to access level 3 page using employee id from response
    setLogstatus(`employee/${response.data[0].idemployee}`)
    }
    //To stop the circularPrograss
    setStop(false)
console.log(response)
  });
 
}
  }
  const handleChange = (event) => {
    //Setting role based on dropown selection from the user
    setAccessPermission(event.target.value);
   //Getting manager Details
    //Refer manager.js file in routes folder in backend
      Axios.get("http://161.97.79.224:3001/manager/getmanager",{
        
      }).then((response)=> {
        if(response.data.err){
          alert(response.data.err)
        }else{
        console.log(response.data)
       setManagerList(response.data)
      }
      
      });

      //Refer Registration.js file in routes folder in backend
      //Getting Department details
      Axios.get("http://161.97.79.224:3001/register/getDepartment",{
        
      }).then((response)=> {
        if(response.data.err){
          alert(response.data.err)
        }else{
        console.log(response.data)
       setDepartmentList(response.data)
      }
      
      });
  }
 
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="white">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Customer Relationship Management
          </Typography>
          <FormControl>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={accessPermission}
          onChange={handleChange}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select role</em>
          </MenuItem>
          <MenuItem value={"access_2"}>Manager/Director</MenuItem>
          <MenuItem value={"access_3"}>Others</MenuItem>
          
        </Select>
      </FormControl>
      <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true"   href='/'>Home</Button>
      </Toolbar>
      </AppBar>
      <div className={classes.grow} />
      {/* Function to select access level */}
     {
        accessPermission !== "" ?
      <Paper className={classes.paperMU}>
     <div className={classes.paper}>
      <Avatar className={classes.avatar}>
          <AccountCircleIcon />
      </Avatar>
     <main className={classes.textField}> 
       <Typography variant="h4"  align ='center' gutterBottom>Registration</Typography>
       <div className={classes.grow} />
       <form onSubmit={handleToggle}>
       <TextField
          id="firstName"
          value={first_name}
          label="Full Name"
          required={true}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your first name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setFirstName(e.target.value)}}
        />
         <TextField
          id="Company name"
          label="Company name"
          value={company}
          required={true}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your company name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setCompany(e.target.value)}}
        />       
        <TextField
          id="country"
          select
          required={true}
          fullWidth
          style={{margin:8}}
          label="Country"
          value={country}
          onChange={(e)=>{ setCountry(e.target.value)}}
          helperText="Please select your Manager"
          variant="outlined"
        >
          {Countries.map((val) => (
            <MenuItem key={val.label} value={val.label}>
              {val.label}
            </MenuItem>
          ))}
        </TextField>
         <TextField
          id="ssid"
          label="SSID"
          required={true}
          value={ssn}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your SSID"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setSsn(e.target.value)}}
        />
        <TextField
          id="Mail"
          label="Mail"
          type="email"
          value={mail}
          required={true}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your mail Id"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setMail(e.target.value)}}
        />
          <TextField
        id="Department"
        fullWidth
        select
        required={true}
        style={{ margin: 8 }}
        label="Department"
        value={department}
        onChange={(e)=>{ setDepartment(e.target.value)}}
        helperText="Please select your Project"
        variant="outlined"
      >
        {departmentlist.map((val) => (
          <MenuItem key={val.iddepartment} value={val.name}>
            {val.name}
          </MenuItem>
        ))}
        
      </TextField>
        <TextField
          id="role"
          label="Role"
          required={true}
          value={role}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your role"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setRole(e.target.value)}}
        />
         <TextField
          id="PhoneNumber"
          label="Phone number"
          value={phonenumber}
          type="tel"
          InputProps={{ inputProps: {pattern:"[0-9]{2}-[0-9]{10}" } }}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter your Contact Number in the Format: 12-1234567890"
          fullWidth
          required={true}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setPhonenumber(e.target.value)}}
        />
        {/* Based On access level selected form will display  */}
      { accessPermission === "access_3" ?
         (
          <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
        <TextField
          id="outlined-select-currency"
          select
          required={true}
          label="Manager"
          value={manager}
          onChange={(e)=>{ setManager(e.target.value)}}
          helperText="Please select your Manager"
          variant="outlined"
        >
          {managerlist.map((val) => (
            <MenuItem key={val.first_name} value={val.first_name}>
              {val.first_name}
            </MenuItem>
          ))}
        </TextField>
      
      </Grid>)
       :
      (null)
       }
          <TextField
          id="Password"
          label="Password"
          required={true}
          value={password}
          style={{ margin: 8 }}
          placeholder="None"
          type="password"
          helperText="Please enter your Password"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setPassword(e.target.value)}}
        />
        <Link style ={{paddingLeft:'29%'}} href="/">Do you have account already? Then do sign in</Link>
        <Grid style ={{paddingLeft:'45%',paddingTop:"10%", paddingBottom:"10%"}}>
        <Button variant="contained" color="primary" type='submit'>
        Sign Up
      </Button>
      </Grid>
      </form>
          {
            stop ?( <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>):
          (
         <Redirect to={`/${logstatus}`}/>
          )
          }
     
     
       </main>
      </div>
      </Paper>
:
<></>
}
    </React.Fragment>
  );
        }
  