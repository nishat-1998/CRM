import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { CSVLink } from "react-csv";
import { Helmet } from 'react-helmet';
//Material ui style components
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

//Material ui core components
import {Box,Grid,Collapse,IconButton,Container,CssBaseline,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper, MenuItem,Button,Dialog ,Slide,TextField,Backdrop,CircularProgress,Tab,Tabs,AppBar,Link} from '@material-ui/core';
//Material ui Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/EditOutlined";
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckIcon from '@material-ui/icons/Check';

import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
//importing external files
import Meeting from './nestedTabs/meeting';
import Invoice from "./nestedTabs/Invoice/Invoice";
import Qoute from "./nestedTabs/qoute/qoute";
import Payment from "./nestedTabs/payment/payment";
import Countries from "../../country"
import Agents from "../../agent"
const moment = require('moment-timezone');

//Function for Dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    margin: theme.spacing(2, 19, 2),
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
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [name,setName] = useState(row.name);
  const [company,setCompany] = useState(row.company);
  const [service,setService] = useState(row.service);
  const [project,setProject] = React.useState(row.project) 
  const [website,setWebsite] = useState(row.website);
  const [payment,setPayment] = useState(row.payment);
  const [contact,setContact] = useState(row.contact);
  const [country,setCountry] = useState(row.country);
  const [mail,setMail] = useState(row.mail);
  const [projectlist, setProjectList] = React.useState([])
  const { manager_id } = props;
  const { employee_id } = props;
  const [editable,setEditable] = useState(false)
  //Get Project detail
  const getProject = () => {
    Axios.get("http://161.97.79.224:3001/register/getProject",{
        
    }).then((response)=> {
      if(response.data.err){
        alert(response.data.err)
      }else{
     setProjectList(response.data)
    }
    
    });
   
   
  }
  React.useEffect(()=>{
    getProject()
  })

  //HandleChange func for tabs used for nested tabs used in each row
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Tabs Index
  const handleChangeIndex = (index) => {
    setValue(index);
  };

   //Update customer details
  const update= (idcustomer)=>{
    //Refer customer.js in routes folder in backend 
    console.log(country)
    Axios.put("http://161.97.79.224:3001/updatecustomer",{
      name: name,
      contact:contact,
      mail:mail,
      service:service,
      website:website,
      company:company,
      project:project,
      country:country,
      idcustomer:idcustomer
    }).then((response)=> {
     alert('Updated');
     setEditable(!editable)
    });
  }


  const deletecustomercount= (idcustomer)=>{
    //Refer leads.js in routes folder in backend 
    Axios.put("http://161.97.79.224:3001/deletecustomerCount",{
  idcustomer:idcustomer
    }).then((response)=> {
     alert('Updated');
    });
  }

  const DeletedCustomerNotification= (customer)=>{
    //Refer notification.js in routes folder in backend 
    Axios.post("http://161.97.79.224:3001/DeletedcustomerNotification",{
    manager_id:manager_id,
    employee_id:employee_id,
    customer:customer,
    date:(moment().format())
    }).then((response)=> {
     alert('Updated');
    });
  }

  //Refer customer.js in routes folder in backend 
  //Delete customer deatils used in delete Icon Button
  const Delete = (idcustomer,customer)=>{
    if (window.confirm("Are you sure you want to delete?")) {
    deletecustomercount(idcustomer)
    DeletedCustomerNotification(customer)
    Axios.put("http://161.97.79.224:3001/deletecustomer",{
      idcustomer:idcustomer,
    }).then((response)=> {
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
        <StyledTableCell align="center">{count}</StyledTableCell>
        {editable?
           <>
        <StyledTableCell component="th" align="center" scope="row">
             <TextField  id="Name"
              value={name}
              margin='none'
              required
              inputProps={{min: 0, style: { textAlign: 'center' }}} 
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e)=>{ setName(e.target.value)}}
                />
        </StyledTableCell>
        <StyledTableCell align="center">
        <TextField
                id="company"
                value={company}
                required
                margin='none'
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setCompany(e.target.value)}}
              />
        </StyledTableCell>
        <StyledTableCell align="center">
        <TextField
          id="country"
          select
          required
          value={country}
          onChange={(e)=>{ setCountry(e.target.value)}}
        >
          {Countries.map((val) => (
            <MenuItem key={val.code} value={val.label}>
              {val.label}
            </MenuItem>
          ))}
        </TextField>
        </StyledTableCell>
        <StyledTableCell align="center">
        <TextField
                id="contact"
                value={contact}
                margin='none'
                type="tel"
                InputProps={{ inputProps: {pattern:"[0-9]{2}-[0-9]{10}" } }}
                required
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
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
                margin='none'
                required
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setMail(e.target.value)}}
              />
        </StyledTableCell>
        <StyledTableCell align="center">
        <TextField
                id="web"
                value={website}
                type='url'
                margin='none'
                required
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
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
      
        <StyledTableCell align="center">
        <TextField
        id="Project"
        select
        required
        value={project}
        onChange={(e)=>{ setProject(e.target.value)}}
       
      >
        {projectlist.map((val) => (
          <MenuItem  value={val.name}>
            {val.name}
          </MenuItem>
        ))}
      </TextField>
        </StyledTableCell>
        <StyledTableCell align="center">
        <TextField
                id="Payment"
                required
                value={payment}
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setPayment(e.target.value)}}
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
               <StyledTableCell align="center">
                {row.project}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.payment}
               </StyledTableCell>
        </>
}
        {
          row.manager_id === row.employee_id ?(<StyledTableCell align="center">Admin</StyledTableCell>):
          row.manager_id === null?
          (<StyledTableCell align="center">{row.employee_id}</StyledTableCell>):
          (<StyledTableCell align="center">{row.manager_id}</StyledTableCell>)
        }
        <StyledTableCell align="center">
               <IconButton onClick={()=>{Delete(row.idcustomer,row.name)}} >
           <DeleteIcon/>
         </IconButton>
         </StyledTableCell>
         <StyledTableCell align="center">
         {editable?<IconButton onClick={()=>{update(row.idcustomer)}}  >
           <CheckIcon/>
         </IconButton>:
         <IconButton onClick={()=>{ setEditable(!editable)}}  >
         <EditIcon/>
       </IconButton>
         }
         </StyledTableCell>
      </TableRow>
      <TableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
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
                    
                    <Tab label="Meeting Info" {...a11yProps(0)} />
                    <Tab label="Invoice" {...a11yProps(1)} />
                    <Tab label="Quote" {...a11yProps(2)} />
                    <Tab label="Payment" {...a11yProps(3)} />
                  </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <Meeting customerId={row.name}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Invoice customerId={row.name}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Qoute customerId={row.name}/>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <Payment customerId={row.name}/>
                </TabPanel>
              </SwipeableViews>      
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </>
  );
}

//Function for Header of the table and getting leads details 
export default function CollapsibleTable(props) {
  const classes = useStyles();
  const [name,setName] = useState('');
  const [company,setCompany] = useState('');
  const [contact,setContact] = useState('');
  const [mail,setmail] = useState('');
  const [website,setWebsite] = useState('');
  const [service,setService] = useState('');
  const [agent,setAgent] = useState('');
  const [country,setCountry] = useState('');
  const {employee_id} = props;
  const {manager_id} = props;
  const [open, setOpen] = React.useState(false);
  const [stop, setStop] = React.useState(true);
  const [project,setProject] = React.useState('') 
  const date = (moment().format('YYYY-MM-DD'));
  const [projectlist, setProjectList] = React.useState([])
  const [row,setRow] = useState([]);
  const {role} = useParams();
  const {id} = useParams();
  var count = 1;
  //For export in csv formate
  const headers = [
    { label: "Full Name", key: "name" },
    { label: "Company", key: "company" },
    { label: "Country", key: "country" },
    { label: "Contact", key: "contact" },
    { label: "Mail", key: "mail" },
    { label: "Website", key: "website" },
    { label: "Service", key: "service" },
    { label: "Agent", key: "agent" },
    { label: "Project", key: "project" },
  ];
  //Get customer detail
  //Refer customer.js in backend
  const getdata = () => {
    if(role === "admin"){
      //Admin page
      Axios.get("http://161.97.79.224:3001/customer/getcustomerForAdmin",{
    }).then((response)=> {
      if(response.data.err){
        alert(response.data.err)
      }else{
      setRow(response.data)
    }
    
    });
    }
    else{
      //Either manager page or employee page
       
    Axios.get("http://161.97.79.224:3001/customers/getcustomers",{
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
      getdata()
    },[row])

    //Dialog handlechange
  const handleClose = () => {
    setOpen(false);
  };
 
  const NewCustomerNotification= (customer)=>{
    //Refer notification.js in routes folder in backend 
    Axios.post("http://161.97.79.224:3001/NewCustomerNotification",{
    manager_id:manager_id,
    employee_id:employee_id,
    customer:customer,
    date:(moment().format())
    }).then((response)=> {
        console.log(response.data)
    
    });
  }


    //Adding new customer
  const  handleToggle = (e)=>{
    e.preventDefault();
    setOpen(!open);
    Axios.post("http://161.97.79.224:3001/customers",{
      name: name,
      contact:contact,
      mail:mail,
      service:service,
      website:website,
      company:company,
      agent:agent,
      manager_id:manager_id,
      employee_id:employee_id,
      date:date,
     project:project,
     country:country
    
    }).then((response)=> {
      if(response.data.message === "err"){
       
        alert("Customer with same details already exist")
      }else{
      alert("Successful")
      updatecustomerscount()
      NewCustomerNotification(name)
      }
      setStop(false)
  console.log(response)
    });
    setName("")
    setContact("")
    setmail("")
    setService("")
    setWebsite("")
    setCompany("")
    setAgent("")
    setCountry("")
  }
  
   //Update Customercount details
 const updatecustomerscount= ()=>{
  //Refer customer.js in routes folder in backend 
  Axios.put("http://161.97.79.224:3001/updatecustomerCount",{
  manager_id:manager_id,
  employee_id:employee_id
  }).then((response)=> {
      console.log(response.data)
  
  });
}
  //Refer customer.js in backend
  const handleClickOpen = () => {

    setOpen(true);
    Axios.get("http://161.97.79.224:3001/register/getProject",{
        
    }).then((response)=> {
      if(response.data.err){
        alert(response.data.err)
      }else{
      console.log(response.data)
     setProjectList(response.data)
    }
    
    });
   
  };
  //Closing Dialog 
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <div>
    <Helmet>
      <title>Customers | Custom Relationship Management</title>
    </Helmet>
      {/* Adding new customer */}
    
    
  <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleCloseDialog}
            aria-labelledby="responsive-dialog-title"
          >
              <Container className="main" component="main" maxWidth="xs">
      <CssBaseline />
      <div >
          <form className={classes.form} autoComplete="off" onSubmit={handleToggle}>
          
           <TextField
          id="Name"
          value={name}
          label="Name"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter customer name"
         required
         fullWidth
         style={{margin:8}}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setName(e.target.value)}}
        />
        <TextField
          id="company"
          label="Company name"
          value={company}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter customer's company name"
          required
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
          required
          style={{margin:8}}
          label="Country"
          value={country}
          fullWidth
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
          id="contact"
          label="Contact"
          value={contact}
          style={{ margin: 8 }}
          placeholder="None"
          type="tel"
          InputProps={{ inputProps: {pattern:"[0-9]{2}-[0-9]{10}" } }}
          helperText="Please enter Contact Number in the Format: 12-1234567890"
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setContact(e.target.value)}}
        />       
         <TextField
          id="website"
          label="Website"
          type="url"
          value={website}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter customer's website url"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setWebsite(e.target.value)}}
        />
        <TextField
          id="Mail"
          label="Mail"
          type="email"
          value={mail}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter customer's mail Id"
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setmail(e.target.value)}}
        />
        <TextField
          id="service"
          label="Service"
          value={service}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter the service for customer"
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>{ setService(e.target.value)}}
        />
         <TextField
          id="agent"
          select
          required
          fullWidth
          style={{margin:8}}
          label="Agent"
          value={agent}
          onChange={(e)=>{ setAgent(e.target.value)}}
          helperText="Please select agent"
          variant="outlined"
        >
          {Agents.map((val) => (
            <MenuItem key={val.label} value={val.value}>
              {val.label}
            </MenuItem>
          ))}
        </TextField>
         <TextField
        id="Project"
        style={{margin:8}}
        select
        fullWidth
        label="Project"
        value={project}
        onChange={(e)=>{ setProject(e.target.value)}}
        helperText="Please select customer's Project"
        variant="outlined"
      >
        {projectlist.map((val) => (
          <MenuItem  value={val.name}>
            {val.name}
          </MenuItem>
        ))}
      </TextField>
       
     <Button variant="contained" color="secondary" className={classes.submit} type="submit">
        Add
      </Button>
      
      </form>
      </div>
          {
            stop ?( <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>):
          (
         <></>
          )
          }
      </Container>   
          </Dialog>

<Button variant="contained" color="primary" className={classes.submit} startIcon={<GetAppIcon/>}>
      <CSVLink  style={{color:'#fff'}} data={row} headers={headers}  filename={"customer_report.csv"}>Export</CSVLink>
      </Button>
 {/* Table Header */}
      <Grid  container
        direction="row"
        justify="center"
        alignItems="center">
    <TableContainer component={Paper} className={classes.root} >
    <Typography style={{margin:10}} variant="h6" color="primary" component="h2">Customers Table</Typography>  
      <Table aria-label="collapsible table" className={classes.container} >
        <TableHead overflow = 'auto'>
          <TableRow>
          <StyledTableCell >
             
             <AddIcon onClick={handleClickOpen}/> 
            
             </StyledTableCell>
             <StyledTableCell  align="center">S.no</StyledTableCell>
            <StyledTableCell  align="center">Name</StyledTableCell>
            <StyledTableCell  align="center">Company</StyledTableCell>
            <StyledTableCell  align="center">Country</StyledTableCell>
            <StyledTableCell  align="center">Contact</StyledTableCell>
            <StyledTableCell  align="center">Mail</StyledTableCell>
            <StyledTableCell  align="center">Website</StyledTableCell>
            <StyledTableCell  align="center">Service</StyledTableCell>
            <StyledTableCell  align="center">Project</StyledTableCell>
            <StyledTableCell  align="center">Payment</StyledTableCell>
            <StyledTableCell  align="center">Added By</StyledTableCell>
            <StyledTableCell  align="center">Delete</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>                                                                                                                                                                                                                                                                                                                  
        <TableBody>
          {/* mapping to above row func */}
          {row.map((row) => (
            <Row key={row.name} row={row} manager_id={manager_id} employee_id={employee_id} count={count++} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    <Button variant="contained" color="primary" className={classes.submit} onClick={handleClickOpen} startIcon={<AddIcon/>}>
        Add
      </Button>
    </div>
  );
}
