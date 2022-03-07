import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { CSVLink } from "react-csv";
import { Helmet } from 'react-helmet';
//Material ui style components
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';

//Material ui core components
import {Box,Grid,Collapse,IconButton,MenuItem,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,CssBaseline,Container,Button,Dialog ,Slide,TextField,Backdrop,CircularProgress,Tab,Tabs,AppBar,Link} from '@material-ui/core';

//Material ui Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/EditOutlined";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import CheckIcon from '@material-ui/icons/Check';

import { useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
//importing external files
import ExcelPage from './Excel/excelPage';
import StatusEdit from './nestedTabs/status';
import StatusDetails from './nestedTabs/statusdetail';

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
    marginLeft: theme.spacing(19),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
 
}));

const Status = [
  {
    value: 7,
    label: 'All',
  },
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function TabPanel(props) {
  const {children, value, index, classes, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
          {value === index && (
              <Container>
                 <Box>
          <Typography component={'span'}>{children}</Typography>
        </Box>
              </Container>
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
  const [agent,setAgent] = useState(row.agent);
  const classes = useRowStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [editable,setEditable] = useState(false)
  
  //HandleChange func for tabs used for nested tabs used in each row
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
//Tabs Index
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const update= (idleads)=>{
    //Refer leads.js in routes folder in backend 
    Axios.put("http://161.97.79.224:3001/updatelead",{
      name: name,
      contact:contact,
      mail:mail,
      service:service,
      website:website,
      company:company,
      agent:agent,
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
  
  });
}

   //Refer leads.js in routes folder in backend 
  //Delete leads deatils used in delete Icon Button
  const Delete = (idleads,lead)=>{
     
    if (window.confirm("Are you sure you want to delete?")) {
      //proceed
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
           <StyledTableCell align="center">{count}</StyledTableCell>
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
                type='email'
                value={mail}
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
                type='url'
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
               <StyledTableCell align="center">
               <TextField
                  id="agent"
                  select
                  required
                  value={agent}
                  onChange={(e)=>{ setAgent(e.target.value)}}
                >
                {Agents.map((val) => (
                  <MenuItem key={val.label} value={val.value}>
                    {val.label}
                  </MenuItem>
                ))}   
              </TextField>
               </StyledTableCell>
               </>
               :
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
                {row.agent}
               </StyledTableCell>
               </>
                 }
             
               <StyledTableCell align="center">
                {row.status}
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
            <Tab label="Status Detail" {...a11yProps(0)} />
          <Tab label="Edit Status Info" {...a11yProps(1)} />
        
         
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <StatusDetails leadsId={row.name}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <StatusEdit leadsId={row.idleads}/>
        </TabPanel>
      </SwipeableViews>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
export default function CollapsibleTable(props) {
  const classes = useStyles();
    const [row,setRow] = React.useState([]);
    const [name,setName] = useState('');
    const [company,setCompany] = useState('');
    const [contact,setContact] = useState('');
    const [mail,setmail] = useState('');
    const [website,setWebsite] = useState('');
    const [service,setService] = useState('');
    const [agent,setAgent] = useState('');
    const [country,setCountry] = useState('');
    const {role} = useParams();
    const {id} = useParams();
    const {employee_id} = props;
    const {manager_id} = props;
    const [dopen, setDopen] = React.useState(false);
    const [stop, setStop] = useState(true);
    const [close, setClose] = useState(false);
    const [excel,setExcel] = useState(false);
    const [status, setStatus] = React.useState('All');
    
    var count=1;
    const headers = [
      { label: "Full Name", key: "name" },
      { label: "Company", key: "company" },
      { label: "Country", key: "country" },
      { label: "Contact", key: "contact" },
      { label: "Mail", key: "mail" },
      { label: "Website", key: "website" },
      { label: "Service", key: "service" },
      { label: "Agent", key: "agent" },
      { label: "Status", key: "status" }
    ];
    //opening import excel sheet
    const handleImport=()=>{
      setExcel(!excel);
    }
     
      const handleClose = () => {
        setClose(false);
      };
 //Update leadscount details
 const updateleadscount= ()=>{
  //Refer leads.js in routes folder in backend 
  Axios.put("http://161.97.79.224:3001/updateleadCount",{
  manager_id:manager_id,
  employee_id:employee_id,
  date:(moment().format('YYYY-MM-DD HH:mm'))
  }).then((response)=> {
      console.log(response.data)
  
  });
}
const handleChangeForAdmin = () => {
if(role === "admin"){
 
  //Admin page
  Axios.get("http://161.97.79.224:3001/leads/getleadsForAdmin",{
	  params:{
		  status:status
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
}

      //Get leads detail
  //Refer leads.js in backend
      const handleChange = () => {
       
         if(role !== "admin")
        {
            //Either Manager page or Employee Page
           
          if(status === "All"){
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
          }else{
            Axios.get("http://161.97.79.224:3001/leads/getleadsWRTstatus",{
              params:{
                manager_id:manager_id,
                employee_id:employee_id,
                status:status
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
       
        }
          React.useEffect(()=>{
                
            handleChange()
            handleChangeForAdmin()
          },[row])
        
          
        //Dialog open
          const handleClickOpen = () => {
            setDopen(true);      
          };

          const NewLeadNotification= ()=>{
            //Refer notification.js in routes folder in backend 
            Axios.post("http://161.97.79.224:3001/NewLeadNotification",{
            manager_id:manager_id,
            employee_id:employee_id,
            lead:name,
            date:(moment().format())
            }).then((response)=> {
                console.log(response.data)
          
            });
          }


          //new lead adding
          const handleSubmit = (e) =>{
            e.preventDefault();
            Axios.post("http://161.97.79.224:3001/leads",{
              name: name,
              contact:contact,
              mail:mail,
              service:service,
              website:website,
              company:company,
              agent:agent,
              country:country,
              manager_id:manager_id,
              employee_id:employee_id,
             date:(moment().format('YYYY-MM-DD HH:mm'))
            }).then((response)=> {
              if(response.data.message === "err"){
               
                alert(response.data.message)
              }else{
              alert("Successful")
              updateleadscount()
              NewLeadNotification(name)
              }
              setStop(false)
              setDopen(false);
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
          const handleCloseDialog = () => {
            setDopen(false);
          };
  return (
    <div>
       <Helmet>
      <title>Leads | Custom Relationship Management</title>
    </Helmet>
      {/* Adding new Leads */}
    <div style={{display:'flex',flexFlow:'row wrap',alignContent:'flex-start',  justify:"flex-end",  direction:"row", margin:10}}>
   <Dialog
            open={dopen}
            TransitionComponent={Transition}
            onClose={handleCloseDialog}
            aria-labelledby="responsive-dialog-title"
          >
          <Container className="main" component="main" maxWidth="xs">
      <CssBaseline />
      <div >
       
        <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}> 
        <TextField
          id="Name"
          value={name}
          required
          label="Name"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter lead's name"
          fullWidth
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
          required
          value={company}
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter lead's company name"
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
          fullWidth
          style={{margin:8}}
          label="Country"
          value={country}
          onChange={(e)=>{ setCountry(e.target.value)}}
          helperText="Please select Country"
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
          required
          style={{ margin: 8 }}
          placeholder="None"
          type="tel"
          InputProps={{ inputProps: {pattern:"[0-9]{2}-[0-9]{10}" } }}
          helperText="Please enter Contact Number in the Format: 12-1234567890"
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
          value={website}
          type="url"
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter lead's website url"
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
          required
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter lead's mail Id"
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
          required
          style={{ margin: 8 }}
          placeholder="None"
          helperText="Please enter the service lead intrested"
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
       
     <Button variant="contained" color="secondary" className={classes.submit} type="submit">
        
        Add
       
      </Button>
      </form>
          {
            stop ?( <Backdrop className={classes.backdrop} open={close} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>):
          (
        <> </>
          )
          }
          
      </div>
   </Container>
    </Dialog>
</div>
{/* Importing bulk of leads detail through excel sheet */}
<Grid 
 container
 direction="row"
 justify="space-evenly"
 alignItems="center"
>
<div>
     <Button variant="contained" color="primary"  onClick={handleImport} startIcon={<PublishIcon/>}>
        Import
      </Button>
      {excel?(<ExcelPage />):(<></>)}
      <Button variant="contained" color="primary" style={{ marginLeft:10}} startIcon={<GetAppIcon/>}>
      <CSVLink  style={{color:'#fff'}} data={row} headers={headers}  filename={"leads_report.csv"}>Export</CSVLink>
      </Button>
     </div>
      <TextField
          id="demo-simple-select-placeholder-label"
          select
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
     <Grid  container
        direction="column"
        justify="center"
        alignItems="center">
    <TableContainer component={Paper} className={classes.root}>
    <Typography style={{margin:10}} variant="h6" color="primary" component="h2">Leads Table</Typography>  
      <Table aria-label="collapsible table" className={classes.container}>
        <TableHead>
          <TableRow>
          <StyledTableCell >
             
              <AddIcon onClick={handleClickOpen}/> 
             
              </StyledTableCell>
              <StyledTableCell align="center">S.no</StyledTableCell>
             <StyledTableCell align="center">Name</StyledTableCell>
             <StyledTableCell  align="center">Company Name</StyledTableCell>
             <StyledTableCell  align="center">Country</StyledTableCell>
             <StyledTableCell   align="center">Contact</StyledTableCell>
            <StyledTableCell   align="center">Mail</StyledTableCell>
            <StyledTableCell   align="center">website</StyledTableCell>
            <StyledTableCell   align="center">Service</StyledTableCell>
            <StyledTableCell   align="center">Agent</StyledTableCell>
             <StyledTableCell   align="center">Status</StyledTableCell>
             <StyledTableCell   align="center">Added by</StyledTableCell>
             <StyledTableCell align="center">Delete</StyledTableCell>
            <StyledTableCell  align="center">Edit</StyledTableCell>
                   
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
    <Button variant="contained" color="primary" className={classes.submit} onClick={handleClickOpen} startIcon={<AddIcon/>}>
        Add
      </Button>
    </div>
    
  );
}
