import React,{useState} from 'react';
import Axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
//Material core
import { Card, CardActions,CardContent,Button,Avatar, Grid, Typography,Divider,Input,InputAdornment,IconButton,Backdrop,CircularProgress,Dialog, DialogActions,DialogTitle,DialogContent,FormControl,InputLabel,Slide}from '@material-ui/core';
//Material Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//Function for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
  },
  avatar: {
    marginLeft: theme.spacing(14),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function OutlinedCard() {
  const classes = useStyles();
  const [dopen, setDopen] = React.useState(false);
  const [stop, setStop] = useState(true);
  const [close, setClose] = useState(false);
  const [password,setPassword] = useState('');
  const [showPassword,setshowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleChangePassword = (e) =>{
    setPassword(e.target.value);
  };
  const handleClose = () => {
    setClose(false);
  };
   //new password change
   const handleSubmit = async ()=>{
    const response = await  Axios.post("http://161.97.79.224:3001/register/adminPasswordChange",{
      password: password,
    });
     try {
      alert("Successful")
      setStop(false)
      setDopen(false);
     }
     catch (error) {
      alert(error);
  }   
  }

  const handleCloseDialog = () => {
    setDopen(false);
  };

  //Dialog open
  const handleClickOpen = () => {
    setDopen(true);      
  };

  return (
    <div >
    <Dialog
    open={dopen}
    TransitionComponent={Transition}
    onClose={handleCloseDialog}
    aria-labelledby="responsive-dialog-title"
    >
   <DialogTitle id="form-dialog-title">Enter new password</DialogTitle>
  <DialogContent>
     <form noValidate>
        <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleChangePassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
         </FormControl>
<DialogActions style={{justifyContent: 'center'}}>
<Button variant="contained" color="secondary" onClick={handleSubmit}> 
Submit
</Button>
</DialogActions>
  {
    stop ?( <Backdrop  open={close} onClick={handleClose}>
    <CircularProgress color="inherit" />
  </Backdrop>):
  (
<> </>
  )
  }
  </form>
  </DialogContent>
</Dialog>

    <Grid container direction="row" justify="center" alignItems="center">
    <Card className={classes.root} >
      <CardContent>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Divider/>       
        <Typography style={{margin:10}} align="center">
         Admin
        </Typography>
        <Typography style={{margin:10}} align="center">
          Admin@gmail.com
        </Typography>
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
        <Button variant="contained" color="secondary"  style={{marginBottom:10}} size="small" onClick={handleClickOpen}>Change Password</Button>
      </CardActions>
    </Card>
    </Grid>
    </div>
  );
}
