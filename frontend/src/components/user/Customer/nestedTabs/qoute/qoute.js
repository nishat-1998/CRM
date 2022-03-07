import React,{useState} from 'react';
//Material ui style
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
//Material ui core
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button} from '@material-ui/core';
//material ui icon
import AddCircleIcon from '@material-ui/icons/AddCircle';
//external file
import AddQoute from "./addqoute";
//For date and time
const moment = require('moment-timezone');


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable(props) {
  const classes = useStyles();
  const {customerId} = props;
  var count = 1;
  const [open,setOpen] = useState(false)
  const [invoice,setInvoice] = React.useState([]);

  //Getting meeting details
  const getQouteData = () =>{
    Axios.get("http://161.97.79.224:3001/qoute/getQoute",{
        params:{
        customer_id:customerId
        }
        
    }).then((response)=> {
      if(response.data.err){
        alert(response.data.err)
      }else{
      console.log(response.data)
     setInvoice(response.data)
    }
    
    });
}

React.useEffect(()=>{
    getQouteData()
  })

  const viewInvoice = (filePath)=>{
   
    Axios.get(`http://161.97.79.224:3001/invoice/viewInvoice`,{
      params:{
        filePath:filePath
      },
      
      responseType: "blob"
      //Force to receive data in a Blob Format
    })
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          type: "application/pdf"
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(error => {
        console.log(error);
      });
    }
    

  return (
      <div>
          <Button style={{marginBottom:20}} color="primary" onClick={()=>{setOpen(!open)}} startIcon={<AddCircleIcon/>}>Add Quote</Button>
          {open?<AddQoute customerId={customerId}/>:<></>}
    <TableContainer component={Paper} style={{marginTop:20}}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell  align="center">S.no</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Time</TableCell>
          <TableCell align="center">Description</TableCell>
          <TableCell align="center">view</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice.map((row) => (
            <TableRow key={row.idappointment}>
              <TableCell  align="center" component="th" scope="row">
                {count++}
              </TableCell>
              <TableCell align="center">{(moment(row.date).format('YYYY-MM-DD'))}</TableCell>
              <TableCell align="center">{(moment(row.time).format('hh:mm A'))}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center"><Button color="primary"  onClick={()=>{viewInvoice(row.path)}}>View</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
