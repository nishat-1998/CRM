import React from 'react';
//Material ui style
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
//Material ui core
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Chip} from '@material-ui/core';
//For date and time
const moment = require('moment-timezone');
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable(props) {
  const classes = useStyles();
  const {leadId} = props;
  var count = 1;
  const [meeting,setMeeting] = React.useState([]);

  //Refer appointment.js in backend
  const getMeetingData = () =>{
    Axios.get("http://161.97.79.224:3001/getmeetings/lead",{
        params:{
        leadId:leadId
        }
        
    }).then((response)=> {
      if(response.data.err){
        alert(response.data.err)
      }else{
      console.log(response.data)
     setMeeting(response.data)
    }
    
    });
}

React.useEffect(()=>{
    getMeetingData()
  })

//Simple Table
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell  align="center">S.no</TableCell>
            <TableCell  align="center">Mode</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meeting.map((row) => (
            <TableRow key={row.idappointment}>
              <TableCell  align="center" component="th" scope="row">
                {count++}
              </TableCell>
              <TableCell align="center">
              <Chip
                        color="primary"
                        label={row.mode}
                        size="small"
                      />
              </TableCell>
              <TableCell align="center">{(moment(row.date).format('YYYY-MM-DD'))}</TableCell>
              <TableCell align="center">{(moment(row.time).format('hh:mm A'))}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
