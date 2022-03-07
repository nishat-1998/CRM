
import React,{useState} from 'react';
import Axios from 'axios';
import { CSVLink } from "react-csv";
import { Helmet } from 'react-helmet';
//Material ui style components
import { makeStyles, withStyles } from '@material-ui/core/styles';

//Material ui core components
import {Grid,Button,MenuItem,IconButton,TextField,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Link} from '@material-ui/core';

//Material ui Icons

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/EditOutlined";
import CheckIcon from '@material-ui/icons/Check';
import GetAppIcon from '@material-ui/icons/GetApp';
import Countries from "../../country"


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

    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

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




// React function for table's row
function Row(props) {
  const { row } = props;
  const { count } = props;
  const [name,setName] = useState(row.first_name);
  const [company,setCompany] = useState(row.company);
  const [country,setCountry] = useState(row.country);
  const [contact,setContact] = useState(row.phonenumber);
  const [mail,setmail] = useState(row.mail);
  const [SSID,setSSID] = useState(row.ssid);
  const [department,setDepartment] = useState(row.department);
  const [role,setRole] = useState(row.role);
  const [manager,setManager] = useState(row.manager_id)
  const classes = useRowStyles();
  const [editable,setEditable] = useState(false)
 
 //Update employee details
 const update= (idemployee)=>{
   console.log(idemployee)
  //Refer employee.js in routes folder in backend 
  Axios.put("http://161.97.79.224:3001/updateemployee",{
    name: name,
    contact:contact,
    mail:mail,
    ssid:SSID,
    department:department,
    company:company,
    role:role,
    country:country,
    idemployee:idemployee
  }).then((response)=> {
      console.log(response.data)
   alert('Updated');
   setEditable(!editable)
  });
}
  
   //Refer leads.js in routes folder in backend 
  //Delete leads deatils used in delete Icon Button
  const Delete = (idemployee)=>{
    if (window.confirm("Are you sure you want to delete?")) {
  
    Axios.put("http://161.97.79.224:3001/deleteemployee",{
      
      idemployee:idemployee,
     
      
    }).then((response)=> {
        console.log(response.data)
     alert('Deleted');
    });
  }
  }

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell>{count}</StyledTableCell>
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
                id="ssid"
                value={SSID}
                required 
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setSSID(e.target.value)}}
              />       
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="department"
                value={department}
                required 
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setDepartment(e.target.value)}}
              />       
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="manager"
                value={manager}
                required 
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setManager(e.target.value)}}
              />       
               </StyledTableCell>
               <StyledTableCell align="center">
               <TextField
                id="role"
                value={role}
                required 
                inputProps={{min: 0, style: { textAlign: 'center' }}} 
                size="small"
                margin='none'
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{ setRole(e.target.value)}}
              />       
               </StyledTableCell>
               </>:
               <>
                <StyledTableCell align="center">
                {row.first_name}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.company}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.country}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.phonenumber}
               </StyledTableCell>
               <StyledTableCell align="center">
               <Link href={`mailto:${row.mail}`}>
                {row.mail}
                </Link>
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.ssid}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.department}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.manager_id}
               </StyledTableCell>
               <StyledTableCell align="center">
                {row.role}
               </StyledTableCell>
               </>}
               <StyledTableCell align="center">
                 {row.total_leads}
               </StyledTableCell>
               <StyledTableCell align="center">
                 {row.total_customers}
               </StyledTableCell>
               <StyledTableCell align="center">
               <IconButton onClick={()=>{Delete(row.idemployee)}} >
           <DeleteIcon/>
         </IconButton>
         </StyledTableCell>
         <StyledTableCell align="center">
         {editable?<IconButton onClick={()=>{update(row.idemployee)}}  >
           <CheckIcon/>
         </IconButton>:
         <IconButton onClick={()=>{ setEditable(!editable)}}  >
         <EditIcon/>
       </IconButton>
         }
         </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}
export default function CollapsibleTable() {
  const classes = useStyles();
    const [row,setRow] = React.useState([]);
    var count =1;
    const headers = [
      { label: "Full Name", key: "first_name" },
      { label: "Company", key: "company" },
      { label: "Contact", key: "phonenumber" },
      { label: "Mail", key: "mail" },
      { label: "SSID", key: "ssid" },
      { label: "Department", key: "department" },
      { label: "Role", key: "role" },
      { label: "Manager", key: "manager_id" },
      { label: "Total leads", key: "total_leads" },
      { label: "Total customer", key: "total_customers" }
    ];
   
   

      //Get manager detail
  //Refer Register.js in backend
      const handleChange = () => {
          Axios.get("http://161.97.79.224:3001/employee/getemployee",{
          }).then((response)=> {
            if(response.data.err){
              alert(response.data.err)
            }else{
            console.log(response.data)
            setRow(response.data)
          }
          
          });
        }
          React.useEffect(()=>{
                
            handleChange()
          },[row])
         
  return (
    <div>
      <Helmet>
      <title>Employees | Custom Relationship Management</title>
    </Helmet>
      <Button variant="contained" color="primary" className={classes.submit} startIcon={<GetAppIcon/>}>
      <CSVLink  style={{color:'#fff'}} data={row} headers={headers}  filename={"employee_report.csv"}>Export</CSVLink>
      </Button>
      <Grid  container
        direction="column"
        justify="center"
        alignItems="center">
           
    <TableContainer component={Paper} className={classes.root}>
    <Typography style={{margin:10}} variant="h6" color="primary" component="h2">Employees Table</Typography>  
      <Table aria-label="collapsible table" className={classes.container}>
        <TableHead>
          <TableRow>
          <StyledTableCell  align="center">S.no.</StyledTableCell>
          <StyledTableCell  align="center">Name</StyledTableCell>
             <StyledTableCell align="center">Company Name</StyledTableCell>
             <StyledTableCell  align="center">Country</StyledTableCell>
             <StyledTableCell  align="center">Contact</StyledTableCell>
            <StyledTableCell  align="center">Mail</StyledTableCell>
            <StyledTableCell  align="center">SSID</StyledTableCell>
            <StyledTableCell  align="center">Department</StyledTableCell>
            <StyledTableCell  align="center">Maanger/Director</StyledTableCell>
            <StyledTableCell  align="center">Role</StyledTableCell>
             <StyledTableCell align="center">Total leads</StyledTableCell>
              <StyledTableCell align="center">Total Customer</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
                   
                   
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Mapping to above Row func */}
          {row.map((row) => (
            <Row key={row.first_name} row={row} count={count++}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </div>
    
  );
}


