import React,{ useState} from 'react';
import axios from 'axios';
//material ui style components
import { makeStyles } from '@material-ui/core/styles';
//material ui style components
import {Button,TextField,Container,Grid} from '@material-ui/core';
//react rounting
import { Redirect,useParams} from 'react-router-dom';

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
 
}));

export default function ResetPass(props) {
  const classes = useStyles();
  const [password1,setPassword1] = useState('');
  const [password2,setPassword2] = useState('');
  const [homePage,setHomePage] = useState(false);
  const {token}= useParams();
  const {role}=useParams();
  const handleToggle = (e) => {
    e.preventDefault();
    axios.post(`http://161.97.79.224:3001/${role}/reset-password/${token}`,{
      password1: password1,
      password2: password2,
    }).then((response) => {
        if (response.data.message === "err" || response.data.message === "Please make sure your passwords match") {
            alert(response.data.message);
          } else {
            alert("Password Updated");
            setHomePage(true);
          }
      console.log(response);
    })
    .catch((err) => {
    alert(err);    
    })

  }
  
  return (
    <>
    {homePage ?
      <Redirect to="/" />
      :
      <Container className="main" component="main" maxWidth="xs">
        <div className={classes.paper}>
              <form Validate autoComplete="off" onSubmit={handleToggle}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password1"
                autoComplete="current-password"
                value={password1}
                onChange={(e)=>{ setPassword1(e.target.value)}}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={password2}
                onChange={(e)=>{ setPassword2(e.target.value)}}
                />
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                 >
                <Button variant="contained" color="secondary" fullwidth type="submit" style={{padding: "10px 10px"}} >
                  Update Password
                </Button>
                </Grid>
                </form>
            </div>
      </Container>
    }
    </>
  );
}
