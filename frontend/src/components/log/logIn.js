import React,{ useState} from 'react';
import Axios from 'axios';
//material ui style components
import { makeStyles } from '@material-ui/core/styles';
//material ui style components
import {Avatar,Button,CssBaseline,TextField,Link,Grid,Typography,Container,Collapse,Snackbar,CircularProgress, Radio,RadioGroup,FormControlLabel} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
//matrial ui icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//react rounting
import { Redirect} from 'react-router-dom';


//defining styles
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 19, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [logstatus,setLogstatus] = useState('')
  const [value, setValue] = React.useState('admin');
  const [stop, setStop] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [passHelper,setPassHelper] = useState(false);

  //Radio button value change function
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  //CircularPrograss change function
  const handleClose = () => {
    setOpen(false);
  };

 //login function after submitting info
  const  handleToggle = (e)=>{
    e.preventDefault();
    //setOpening CircularPrograss
    setOpen(!open);
    if(value === "admin"){
      //if Radial button chacked for Admin
      Axios.post("http://161.97.79.224:3001/admin/login",{
        username: username,
        password: password,
      }).then((response)=> {
           if(response.data.message){
            alert(response.data.message)
            }else{
                //setting page to access level 1 page using admin id from response
                setLogstatus(`admin/${response.data[0].idAdmin}`)
                alert("Successful")
                }
                //Stoping the Circular prograss
                setStop(false)
       });
    }
    else if(value === "manager"){
       //if Radial button chacked for Manager
    Axios.post("http://161.97.79.224:3001/manager/login",{
      username: username,
      password: password,
    }).then((response)=> {
              if(response.data.message){
              alert(response.data.message)
              }else{
              //setting to AccessLevel 2 page using managerid from response from API
              setLogstatus(`manager/${response.data[0].idmanager}`)
              alert("Successful")
              }
              //Stoping the Circular prograss
              setStop(false)
     });
    }else{
      //If Radial Button checked for Others
        Axios.post("http://161.97.79.224:3001/employee/login",{
          username: username,
          password: password,
        }).then((response)=> {
          if(response.data.message){
            alert(response.data.message)
          }else{
            alert("Successful")
            //Getting to access level 3 page through employee id from responses
            setLogstatus(`employee/${response.data[0].idemployee}`)
           }
           setStop(false)
            });
      }
  }

  const handleToggle2 = (event) => {
    event.preventDefault();
    console.log(username);
    Axios.post(`http://161.97.79.224:3001/${value}/resetpassword`, {
      username: username,
    })
    .then((response) => {
            if (response.data.message === "err" || response.data.message === "User doesn't exist") {
                alert(response.data.message)
            } else {
                alert("Check your mail");
                setPassHelper(false);
            }
            console.log(response);
        })
    .catch((err) => {
      alert(err);    
    })
}


  return (
    <>
    {!passHelper ? 
    (<Container className="main" component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form Validate autoComplete="off" onSubmit={handleToggle}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="email"
            id="Email"
            label="Email"
            name="User"
            autoComplete="Email"
            autoFocus
            onChange={(e)=>{ setUsername(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>{ setPassword(e.target.value)}}
           
          />
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
           <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
           <FormControlLabel
            value="admin"
              control={<Radio color="primary" />}
              label="Admin"
              labelPlacement="start"
            />
            <FormControlLabel
            value="manager"
              control={<Radio color="primary" />}
              label="Manager/Director"
              labelPlacement="start"
            />
            <FormControlLabel
              value="employee"
              control={<Radio color="primary" />}
              label="Others"
              labelPlacement="start"
            />
            </RadioGroup>
            </Grid> 
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                 >
           <Button variant="contained" color="secondary" fullwidth type="submit" style={{padding: "10px 10px"}}>
            Sign In
           </Button>
           </Grid>
          { /* function to open the circularPrograss. If this is successful login user routes to his page */}
          {
            stop ?( <Collapse in={open}>
               <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={open}
          >
              <Alert
              severity="error"
                action={
                 <CircularProgress color="inherit"/>
                }
              >
                loading...
              </Alert>
              </Snackbar>
            </Collapse>):
          (
         <Redirect to={`/${logstatus}`}/>
          )
          }
     
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => setPassHelper(true)}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>)
    :
      (<Container className="main" component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
            <FormControlLabel
              value="admin"
                control={<Radio color="primary" />}
                label="Admin"
                labelPlacement="start"
              />
              <FormControlLabel
              value="manager"
                control={<Radio color="primary" />}
                label="Manager/Director"
                labelPlacement="start"
              />
              <FormControlLabel
                value="employee"
                control={<Radio color="primary" />}
                label="Others"
                labelPlacement="start"
              />
              </RadioGroup>
            </Grid> 
              <form Validate autoComplete="off" onSubmit={handleToggle2}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Email2"
                  type="email"
                  label="Email"
                  name="User2"
                  autoComplete="Email"
                  autoFocus
                  value={username}
                  onChange={(e)=>{ setUsername(e.target.value)}}  
                />
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                 >
                <Button variant="contained" color="secondary" fullwidth type="submit"  style={{padding: "10px 10px"}} >
                  Reset Password
                </Button>
                </Grid>
                </form>
            </div>
      </Container>)
    }
    </>
  );
}