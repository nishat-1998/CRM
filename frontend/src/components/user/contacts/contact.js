
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Helmet } from 'react-helmet';
//Material ui style components
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

//Material ui core components
import {Box,Grid,Collapse,IconButton,TextField,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Tab,Tabs,AppBar,Link} from '@material-ui/core';

//Material ui Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/EditOutlined";
import CheckIcon from '@material-ui/icons/Check';

import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
//importing external files
import ScheduleAppointment from './nestedTabs/scheduleAppointment';
import AppointmentDetail from './nestedTabs/appointmentDetails';
const moment = require('moment-timezone');


//Style for table cell
const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

   

   //Defining style  
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    width: 1030,
  },
  container: {
    minWidth: 1440,
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


// React function for table's row
function Row(props) {
  const { row } = props;
  const { count } = props;
  const { manager_id } = props;
  const { employee_id } = props;
  const [open, setOpen] = React.useState(false);
  const [name,setName] = useState(row.name);
  const [company,setCompany] = useState(row.company);
  const [contact,setContact] = useState(row.contact);
  const [country,setCountry] = useState(row.country);
  const [mail,setmail] = useState(row.mail);
  const [website,setWebsite] = useState(row.website);
  const [service,setService] = useState(row.service);
  const classes = useRowStyles();
  const theme = useTheme();
  const [editable,setEditable] = useState(false)
  const [value, setValue] = React.useState(0);
 
  //HandleChange func for tabs used for nested tabs used in each row
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//Tabs Index
  const handleChangeIndex = (index) => {
    setValue(index);
  };

   //Update lead details
  const update= (idleads)=>{
    //Refer leads.js in routes folder in backend 
    Axios.put("http://161.97.79.224:3001/updatelead",{
      name: name,
      contact:contact,
      mail:mail,
      service:service,
      website:website,
      company:company,
      country:country,
      idleads:idleads
    }).then((response)=> {
        console.log(response.data)
     alert('Updated');
     setEditable(!editable)
    });
  }

  //delete leadscount details
const deleteleadscount= (idleads)=>{
  //Refer leads.js in routes folder in backend 
  Axios.put("http://161.97.79.224:3001/deleteleadCount",{
    idleads:idleads
  }).then((response)=> {
      console.log(response.data)
   alert('Updated');
  });
}

const DeletedLeadNotification= (lead)=>{

  //Refer notification.js in routes folder in backend 
  Axios.post("http://161.97.79.224:3001/DeletedLeadNotification",{
  manager_id:manager_id,
  employee_id:employee_id,
  lead:lead,
  date:(moment().format())
  }).then((response)=> {
      console.log(response.data)
   alert('Updated');
  });
}

   //Refer leads.js in routes folder in backend 
  //Delete leads deatils used in delete Icon Button
  const Delete = (idleads,lead)=>{
    if (window.confirm("Are you sure you want to delete?")) {
    deleteleadscount(idleads)
    DeletedLeadNotification(lead)
    Axios.put("http://161.97.79.224:3001/deletelead",{
      
      idleads:idleads,
     
      
    }).then((response)=> {
        console.log(response.data)
     alert('Deleted');
    });
  }
  }

  return (
    <>
      <TableRow className={classes.root}>
      <StyledTableCell>
           <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
           </IconButton>
           </StyledTableCell>
           <StyledTableCell  align="center">{count}</StyledTableCell>
           {editable?
           <>
             <StyledTableCell component="th" align="center" scope="row">
             <TextField  id="Name"
              value={name}
              required
              inputProps={{min: 0, style: { textAlign: 'center' }}} 
              size="small"
              margin='none'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>{ setName(e.target.value)  
                 console.log(row.idleads)}}
                />
                </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="company"
                value={company}
                required
                size="small"
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setCompany(e.target.value)}}
              />
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="country"
                value={country}
                required
                size="small"
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setCountry(e.target.value)}}
              />
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="contact"
                value={contact}
                required
                type="tel"
                InputProps={{ inputProps: {pattern:"[0-9]{2}-[0-9]{10}" } }}
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setContact(e.target.value)}}
              />       
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="mail"
                value={mail}
                type="email"
                required
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setmail(e.target.value)}}
              />       
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="web"
                value={website}
                type="url"
                required
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setWebsite(e.target.value)}}
              />       
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="service"
                value={service}
                required
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setService(e.target.value)}}
              />       
               </StyledTableCell>
               </>:
               <>
               <StyledTableCell align="center">
                {row.name}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.company}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.country}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.contact}
               </StyledTableCell>
               <StyledTableCell align="center">
               <Link href={`mailto:${row.mail}`}>
                {row.mail}
                </Link>
               </StyledTableCell>
               <StyledTableCell align="center">
               <Link href={row.website}>
                {row.website}
                </Link>
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.service}
               </StyledTableCell>
             </>
             }
               <StyledTableCell align="center">
                {row.count}
              </StyledTableCell>
               {
                 row.manager_id === row.employee_id ?(<StyledTableCell align="center">Admin</StyledTableCell>):
          row.manager_id === null?
          (<StyledTableCell align="center">{row.employee_id}</StyledTableCell>):
          (<StyledTableCell align="center">{row.manager_id}</StyledTableCell>)
        }
               <StyledTableCell align="center">
               <IconButton onClick={()=>{Delete(row.idleads,row.name)}} >
           <DeleteIcon/>
         </IconButton>
         </StyledTableCell>
         <StyledTableCell align="center">
         {editable?<IconButton onClick={()=>{update(row.idleads)}}  >
           <CheckIcon/>
         </IconButton>:
         <IconButton onClick={()=>{ setEditable(!editable)}}  >
         <EditIcon/>
       </IconButton>
         }
         </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
            <AppBar position="static" color="inherit" elevation = {0}>
                {/*Nested tabs*/}
                <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
           >
          <Tab label="Appointment Detail" {...a11yProps(0)} />
          <Tab label="Schedule appointment" {...a11yProps(1)} />
         
          </Tabs>
         </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
       <AppointmentDetail leadId={row.name} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
       <ScheduleAppointment leadId={row.idleads} count={row.count}/>
        </TabPanel>
          </SwipeableViews>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
export default function CollapsibleTable() {
  const classes = useStyles();
    const [row,setRow] = React.useState([]);
    const {role} = useParams();
    const {id} = useParams();
    const [employee_id,setEmployee_id] = useState('NULL');
    const [manager_id,setManager_id] = useState('NULL');
   var count=1;
   

      //Get leads detail
  //Refer leads.js in backend
      const handleChange = () => {
        if(role === "admin"){
          //Admin page
          Axios.get("http://161.97.79.224:3001/leads/getleadsForAdmin",{
		  params:{
			  status:"All"
		  }
          }).then((response)=> {
            if(response.data.err){
              alert(response.data.err)
            }else{
            console.log(response.data)
            setRow(response.data)
          }
          
          });
        }
          else {
            //Either Manager page or Employee Page
            if(role === "manager"){
            setManager_id(id);
          }else{
            setEmployee_id(id);
          }
          Axios.get("http://161.97.79.224:3001/leads/getleads",{
            params:{
              manager_id:manager_id,
              employee_id:employee_id
              }
          }).then((response)=> {
            if(response.data.err){
              alert(response.data.err)
            }else{
            setRow(response.data)
          }
          
          });
        }
        }
          React.useEffect(()=>{
                
            handleChange()
          })
         
  return (
    <div>
 <Helmet>
      <title>Contacts | Custom Relationship Management</title>
    </Helmet>
      <Grid  container
        direction="column"
        justify="center"
        alignItems="center">  
    <TableContainer component={Paper} className={classes.root}>
    <Typography style={{margin:10}} variant="h6" color="primary" component="h2">Contacts Table</Typography>  
      <Table aria-label="collapsible table" className={classes.container}>
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
          <StyledTableCell align="center">S.no</StyledTableCell>
          <StyledTableCell align="center">Name</StyledTableCell>
          <StyledTableCell align="center">Company Name</StyledTableCell>
          <StyledTableCell align="center">Country</StyledTableCell>
          <StyledTableCell align="center">Contact</StyledTableCell>
          <StyledTableCell align="center">Mail</StyledTableCell>
          <StyledTableCell align="center">website</StyledTableCell>
          <StyledTableCell align="center">Service</StyledTableCell>
          <StyledTableCell align="center">Count</StyledTableCell>
          <StyledTableCell align="center">Added by</StyledTableCell>
          <StyledTableCell align="center">Delete</StyledTableCell>
          <StyledTableCell align="center">Edit</StyledTableCell>      
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Mapping to above Row func */}
          {row.map((row) => (
            <Row key={row.name} row={row} manager_id={manager_id} employee_id={employee_id} count={count++} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </div>
    
  );
}


