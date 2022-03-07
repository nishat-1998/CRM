
import React from 'react';
//material ui style components
import { makeStyles } from '@material-ui/core/styles';
//material ui core components
import {AppBar,Toolbar,Typography,Button, Container,Grid,Dialog,Slide} from '@material-ui/core';
//Particle for background of the page
import ParticlesBg from 'particles-bg';
//importing external files.
import SignIn from './log/logIn';

//For signIn Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//defining styling for page
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(7, 0, 6),
      },
}));

export default function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
 //handlechange function for dialog open
  const handleClickOpen = () => {
    setOpen(true);
  };
//handlechange function for dialog close
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Customer Relationship Management
          </Typography>
      
          <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true"   onClick={handleClickOpen} >Sign In</Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleCloseDialog}
            aria-labelledby="responsive-dialog-title"
          >
           <SignIn/> 
          </Dialog>
        </Toolbar>
      </AppBar>
                <main>
                <ParticlesBg color="#000000" num={100} type="cobweb" bg={true} />
                <div className={classes.heroContent} 
                    style={{backgroundColor:"transparent", position:"relative"}}>
                  <Container maxWidth="sm">
                    
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    CRM
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    This CRM system helps you keep your customer's contact details up to date, track every interaction they have with your business, and manage their accounts. It's designed to help you, improve your customer relationships, and in turn, customer lifetime value.
                    </Typography>
                    <div className={classes.heroButtons}>
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                        <Button variant="contained" color="secondary" href={"/Register"}>
                        Get start
                        </Button>
                        </Grid>
                      </Grid>
                    </div>
                   </Container>
                </div>
               </main>
    </div>
  );
}
