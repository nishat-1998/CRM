import React, { useState,useEffect } from 'react';
import { Box, Button, CardActions, Card, CardContent, CardHeader, Divider, Grid, TextField, Container } from '@material-ui/core';
import axios from 'axios';
import SaveIcon from "@material-ui/icons/Save";
//material ui style components
import { makeStyles } from '@material-ui/core/styles';

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
    submit: {
      margin: theme.spacing(3, 19, 2),
    },
  }));

export default function AccountProfileDetails(props) {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        mail: '',
        phone: '',
        roleatcompany: '',
        company: '',
        country: '',
        department: ''
    });
    const [pass,setPass] = useState(false);
    const role=props.role;
    const id=props.id;
    const [password1,setPassword1] = useState('');
    const [password2,setPassword2] = useState('');
    const handleToggle = (e) => {
        e.preventDefault();
        axios.post(`http://161.97.79.224:3001/${role}/profile/reset-password/${id}`,{
          password1: password1,
          password2: password2,
        }).then((response) => {
            if (response.data.message === "err" || response.data.message === "Please make sure your passwords match") {
                alert(response.data.message);
                } else {
                alert("Password Updated");
                setPass(false);
                }
          console.log(response);
        })
        .catch((err) => {
        alert(err);    
        })
      }

    useEffect(() => {
        let getData = async () => {
            const response = await axios.get(`http://161.97.79.224:3001/${role}/get${role}/${id}`);
            try {
                console.log(response.data);
                let obj={
                    name: response.data[0].first_name,
                    mail: response.data[0].mail,
                    phone: response.data[0].phonenumber,
                    roleatcompany: response.data[0].role,
                    company: response.data[0].company,
                    country: response.data[0].country,
                    department: response.data[0].department
                }
                setValues(obj);
            }
            catch (error) {
                alert(error);
            }
        };
        getData();
    }, [])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const submitForm = (e) => {
        console.log(props.role, props.id);
        e.preventDefault();
        axios.post(`http://161.97.79.224:3001/${role}/profile/${id}`, {
            name: values.name,
            mail: values.mail,
            phone: values.phone,
            company: values.company,
            country: values.country,
            department: values.department,
            roleatcompany: values.roleatcompany
        })
            .then((response) => {
                if (response.data.message === "err") {
                    alert(response.data.message)
                } else {
                    alert("Successful")
                }
                console.log(response);
            })
        // setValues({
        //     name: '',
        //     mail: '',
        //     phone: '',
        //     roleatcompany: '',
        //     company: '',
        //     country: '',
        //     department: ''
        // });
    };

    return (
        <>
        {!pass ? 
            (<form
            autoComplete="off"
            noValidate
            onSubmit={submitForm}
            {...props}
            >
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                    style={{ textAlign: 'center' }}
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify your name"
                                label="Name"
                                name="name"
                                onChange={handleChange}
                                required
                                value={values.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="mail"
                                type="email"
                                onChange={handleChange}
                                required
                                value={values.mail}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                onChange={handleChange}
                                required
                                type="tel"
                                InputProps={{ inputProps: {pattern:"[0-9]{2}-[0-9]{10}" } }}
                                helperText="Please enter your Contact Number in the Format: 12+1234567890"
                                value={values.phone}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the name of your company"
                                label="Company"
                                name="company"
                                onChange={handleChange}
                                required
                                value={values.company}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Country"
                                name="country"
                                onChange={handleChange}
                                required
                                value={values.country}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Department"
                                name="department"
                                onChange={handleChange}
                                required
                                value={values.department}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Role"
                                name="roleatcompany"
                                onChange={handleChange}
                                required
                                value={values.roleatcompany}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions style={{ justifyContent: 'center' }}>
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: 2
                        }}
                    >
                        <Button
                            type="submit"
                            color="primary"
                            style={{ backgroundColor: "#434343", marginRight:"50px"}}
                            variant="contained"
                            startIcon={<SaveIcon />}
                        >
                            Save details
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            style={{ backgroundColor: "#434343", marginLeft:"50px" }}
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={()=> { setPass(true)}}
                        >
                            Reset Password
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </form>)
        :
        (<Container className="main" component="main" maxWidth="xs">
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
        </Container>)
        }  
        </>
    );
};