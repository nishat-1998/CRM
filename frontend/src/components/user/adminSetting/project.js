
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
//Material ui style components
import { withStyles } from '@material-ui/core/styles';

//Material ui core components
import {Box,Grid,IconButton,TextField,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,Paper,Dialog,Container,CssBaseline,Button,Backdrop,CircularProgress,Slide} from '@material-ui/core';

//Material ui Icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/EditOutlined";
import CheckIcon from '@material-ui/icons/Check';

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

    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);

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




// React function for table's row
function Row(props) {
  const { row } = props;
  const { count } = props;
  const [name,setName] = useState(row.name);
  const [editable,setEditable] = useState(false)
 
   //Update project details
  const update= (idproject)=>{
    //Refer registration.js in routes folder in backend 
    Axios.put("http://161.97.79.224:3001/register/updateProject",{
      name: name,
      idproject:idproject
    }).then((response)=> {
        console.log(response.data)
     alert('Updated');
     setEditable(!editable)
    });
  }

   //Refer registration.js in routes folder in backend 
  //Delete project deatils used in delete Icon Button
  const Delete = (idproject)=>{
    if (window.confirm("Are you sure you want to delete?")) {
    Axios.put("http://161.97.79.224:3001/register/deleteProject",{
      idproject:idproject,
    }).then((response)=> {
        console.log(response.data)
     alert('Deleted');
    });
  }
  }

  return (
    <React.Fragment>
      <StyledTableRow key={row.name}>
      <StyledTableCell></StyledTableCell>
          <StyledTableCell align="center">{count}</StyledTableCell>
          {editable?
           <>
             <StyledTableCell component="th" align="center" scope="row">
             <TextField  id="Name" value={name} required inputProps={{min: 0, style: { textAlign: 'center' }}}  size="small" margin='none' InputLabelProps={{shrink: true, }} onChange={(e)=>{ setName(e.target.value)}}  />
              </StyledTableCell>
                </>:
                <>
                 <StyledTableCell align="center">
                   {row.name}
                 </StyledTableCell>
                </>}
               <StyledTableCell align="center">
               <IconButton onClick={()=>{Delete(row.idproject)}} > <DeleteIcon/> </IconButton>
               </StyledTableCell>
               <StyledTableCell align="center">
               {editable?<IconButton onClick={()=>{update(row.idproject)}}> <CheckIcon/> </IconButton>
               :
              <IconButton onClick={()=>{ setEditable(!editable)}}> <EditIcon/> </IconButton>
               }
             </StyledTableCell>
           </StyledTableRow>
        </React.Fragment>
  );
}
export default function Project() {
    const [row,setRow] = React.useState([]);
    const [name,setName] = useState('');
    const [dopen, setDopen] = React.useState(false);
    const [stop, setStop] = useState(true);
    const [close, setClose] = useState(false);
    var count=1;
    const handleClose = () => {
        setClose(false);
      };
       //new project adding
       const handleSubmit = (e) =>{
        e.preventDefault();
        Axios.post("http://161.97.79.224:3001/register/Project",{
          name: name,
        }).then((response)=> {
          if(response.data.message === "err"){
            alert("Project with same name exist ")
          }else{
          alert("Successful")
          }
          setStop(false)
          setDopen(false);
      console.log(response)
        });
       
      }

      const handleCloseDialog = () => {
        setDopen(false);
      };

      //Dialog open
      const handleClickOpen = () => {
        setDopen(true);      
      };
      //Get project detail
  //Refer registration.js in backend
      const handleChange = () => {
          Axios.get("http://161.97.79.224:3001/register/getProject",{
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
          })
         
  return (
    <div>
     <Dialog open={dopen} TransitionComponent={Transition} onClose={handleCloseDialog}  aria-labelledby="responsive-dialog-title">
       <Container className="main" component="main" maxWidth="xs">
       <CssBaseline />
        <div>
        <form onSubmit={handleSubmit}>
        <TextField id="Name" value={name} label="Name" required style={{ margin: 8 }} placeholder="None" helperText="Please enter project name" fullWidth margin="normal" InputLabelProps={{shrink: true, }} variant="outlined" onChange={(e)=>{ setName(e.target.value)}}/>
        <Button variant="contained" color="secondary" type="submit"> Add </Button>
        </form>
          {
            stop ?( <Backdrop  open={close} onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>):
          (
        <> </>
          )
          }
          
      </div>
   </Container>
  </Dialog>
 <Grid  container direction="column" justify="center" alignItems="center">    
    <TableContainer component={Paper} style={{maxWidth:500}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell >
              <AddIcon onClick={handleClickOpen}/>
             </StyledTableCell>
             <StyledTableCell  align="center">S.no</StyledTableCell> 
             <StyledTableCell  align="center">Name</StyledTableCell> 
             <StyledTableCell  align="center">Delete</StyledTableCell>
             <StyledTableCell  align="center">Update</StyledTableCell>      
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Mapping to above Row func */}
          {row.map((row) => (
            <Row key={row.name} row={row} count={count++} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button variant="contained" color="primary" style={{marginTop:10}} onClick={handleClickOpen} startIcon={<AddIcon/>}> Add </Button>
  </Grid>
  
    </div>
    
  );
}


