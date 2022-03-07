import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Axios from 'axios';
//Material ui style
import { makeStyles, useTheme } from '@material-ui/core/styles';
//Material ui core
import { Alert, AlertTitle } from '@material-ui/lab';
import { Drawer, Link, CssBaseline, AppBar, Toolbar, Typography, IconButton, Tabs, Tab, Box, Badge, Menu, MenuItem, Avatar, Divider, Snackbar, Grid } from '@material-ui/core';
//Material ui icon
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';

//Importing external files
import Leads from "./Leads/leads"
import Customer from "./Customer/customer";
import Contacts from "./contacts/contact";
import Manager from './Manager/manager';
import Employee from './Employee/employee';
import Profile from "./Profile/profile";
import AdminSettings from "./adminSetting/setting"
import Dashboard from "./Dashboard/dashboard";
import EmployeeManager from "./Employee/employeeManager";
import { useParams } from 'react-router-dom';
const moment = require('moment-timezone');
//Dialog
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const drawerWidth = 240;

//Defining style
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  snackBar: {
    maxWidth: 800,
    '& > * + *': {
      marginTop: theme.spacing(8),
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  avatar: {
    margin: theme.spacing(2, 10),
    width: theme.spacing(10),
    height: theme.spacing(10),

  },
}));


export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [row, setRow] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name,setName] = React.useState(null);
  const { role } = useParams();
  const { id } = useParams();
  const [manager_id, setManager_id] = useState('NULL');
  const [employee_id, setEmployee_id] = useState('NULL');
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleDeleteNotification = (idnotification) => {
    Axios.put("http://161.97.79.224:3001/deleteNotification", {

      idnotification: idnotification,


    }).then((response) => {
      console.log(response.data)
      alert('Deleted');

    });
  }

  const getNotification = () => {
    if (role === "admin") {
      //Admin page
      Axios.get("http://161.97.79.224:3001/notification/getnotificationForAdmin", {
      }).then((response) => {
        if (response.data.err) {
          alert(response.data.err)
        } else {
          console.log(response.data)
          setRow(response.data)
        }

      });
    }
    else {
      //Either Manager page or Employee Page
      if (role === "manager") {
        setManager_id(id);
        Axios.get("http://161.97.79.224:3001/notification/getnotification", {
          params: {
            manager_id: manager_id,
          }
        }).then((response) => {
          if (response.data.err) {
            alert(response.data.err)
          } else {
            console.log(response.data)
            setRow(response.data)
          }

        });
      }
      else{
        setEmployee_id(id)
      }
    }
  }
  React.useEffect(() => {

  
    let getData = async () => {
      const response = await Axios.get(`http://161.97.79.224:3001/${role}/get${role}/${id}`);
      try {
          console.log(response.data);
          setName(response.data[0].first_name);
      }
      catch (error) {
          alert(error);
      }
  };
  getNotification();
  getData();

  })
  const handleClickSnackBar = () => {
    setOpenSnack(true);
  };

  const handleCloseSnackBar = () => {
    setOpenSnack(false);
  };

  //MenuItem
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="inherit"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Customer Relationship management
          </Typography>
          <IconButton onClick={handleClickSnackBar}>
            {!row.length ? (< NotificationsIcon />) : (<Badge variant="dot" color="error"> < NotificationsIcon /> </Badge>)}

          </IconButton>

          <Snackbar
            className={classes.snackBar}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnackBar}
          >
            <Grid
              container
              direction="column"
              justify="flex-end"
              alignItems="flex-end"
            >
              {row.map((row) => (

                <Alert severity="info"
                  style={{ margin: 13 }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        handleDeleteNotification(row.idnotification)
                      }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  }>
                  {row.manager === null ? <AlertTitle>{`${row.title} by ${row.employee}`}</AlertTitle> : <AlertTitle>{`${row.title} by ${row.manager}`}</AlertTitle>}

                  <h6 style={{ marginLeft: 5 }}>{moment(row.time).calendar()}</h6>
                </Alert>
              ))}
            </Grid>
          </Snackbar>
          <IconButton onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
            < AccountCircleIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >

            <MenuItem >
              <Link href="/" color="inherit" underline="none">
                Logout
          </Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Avatar className={classes.avatar} style={{ color: "#000000", backgroundColor: "#434343" }}>
          <Typography variant="h4" component="h1" style={{ color: "#FFFFFF"}}>
            {role === "admin"? "A" :  name && name.charAt(0).toUpperCase()}
           
          </Typography>
        </Avatar>
        <Divider />
        {
          //If page is access level 1 i.e admin page then total there are 6 tabs in drawer
          role === "admin" ?

            (
              <div>
                <Tabs value={value} indicatorColor="primary"
                  textColor="primary" orientation="vertical" onChange={handleChange} aria-label="simple tabs example">
                  <Tab label="Dashboard" {...a11yProps(0)} />
                  <Tab label="Leads" {...a11yProps(1)} />
                  <Tab label="Contacts" {...a11yProps(2)} />
                  <Tab label="Customers" {...a11yProps(3)} />
                  <Tab label="Settings" {...a11yProps(4)} />
                  <Tab label="Employees" {...a11yProps(5)} />
                  <Tab label="Managers" {...a11yProps(6)} />
                </Tabs>
              </div>
            ) :
            //If page is access level 2 and 3 i.e manager page and employee page then total there are 5 tabs for access level 2 and 4 tabs for access level 3 in drawer
            <Tabs value={value} indicatorColor="primary"
              textColor="primary" orientation="vertical" onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Dashboard" {...a11yProps(0)} />
              <Tab label="Leads" {...a11yProps(1)} />
              <Tab label="Contacts" {...a11yProps(2)} />
              <Tab label="Customers" {...a11yProps(3)} />
              <Tab label="Settings" {...a11yProps(4)} />
              {(role === "manager" ?
                (
                  <Tab label="Employees" {...a11yProps(5)} />
                ) :
                <></>)
              }
            </Tabs>
        }

      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <TabPanel value={value} index={0}>
        <Dashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Leads manager_id={manager_id} employee_id={employee_id}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Contacts />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Customer manager_id={manager_id} employee_id={employee_id}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
        {(role === "admin") ?
            <AdminSettings/> :
            <Profile />}
        
        </TabPanel>
        <TabPanel value={value} index={5}>
          {(role === "admin") ?
            <Employee /> :
            <EmployeeManager />}
        </TabPanel>
        <TabPanel value={value} index={6}>
          <Manager />
        </TabPanel>
      </main>
    </div>
  );
}
