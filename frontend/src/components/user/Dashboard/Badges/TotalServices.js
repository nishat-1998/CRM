import React, { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25)
        // color: theme.palette.getContrastText(deepPurple[500]),
        // backgroundColor: deepPurple[500]
    },
}));

export default function TotalServices(props) {
    const classes = useStyles();
    const [serviceCount, setServiceCount] = useState(0);
    const [flag, setFlag] = useState(true);
    const [ans, setAns] = useState(0);

    useEffect(() => {

        async function fetchData(){

            const [resLeadService,resCustomerService,resLastLeadService,resLastCustomerService,resCurLeadService,resCurCustomerService] = await Promise.all([axios.get('http://161.97.79.224:3001/chart/leads/servicecount'),axios.get('http://161.97.79.224:3001/charts/customer/service') ,axios.get('http://161.97.79.224:3001/badges/leads/lastmonthservice'), axios.get('http://161.97.79.224:3001/badges/customer/lastmonthservice'), axios.get('http://161.97.79.224:3001/badges/leads/curmonthservice'), axios.get('http://161.97.79.224:3001/badges/customer/curmonthservice') ]);
            
            try{
                console.log(resLeadService.data);
                let temp1 = resLeadService.data[0].ServiceCount;
                let temp2 = resCustomerService.data[0].ServiceCount;
                setServiceCount(temp1+temp2);
                let lasttemp1 = resLastLeadService.data[0].ServiceCount;
                let lasttemp2 = resLastCustomerService.data[0].ServiceCount;
                let curtemp1 = resCurLeadService.data[0].ServiceCount;
                let curtemp2 = resCurCustomerService.data[0].ServiceCount;
                let cur=curtemp1+curtemp2;
                let prev=lasttemp1+lasttemp2;
                if (cur >= prev) {
                    let num = cur - prev;
                    let den = prev;
                    if (den !== 0) {
                        let ans = (num * 100) / den;
                        setAns(ans.toFixed(2));
                    } else {
                        let ans = (num * 100);
                        setAns(ans.toFixed(2));
                    }
                    setFlag(true);
                }
                else {
                    let num = prev - cur;
                    let den = prev;
                    let ans = (num * 100) / den;
                    setAns(ans.toFixed(2));
                    setFlag(false);
                }
            }
            catch(error) {
                alert(error);
            }
        }
        fetchData();

        // await axios.get('http://localhost:3001/charts/leads/service')
        //     .then((response) => {
        //         if (response.data.err) {
        //             alert(response.data.err)  // use React Toastify !
        //         } else {
        //             console.log(response.data);
        //             setTemp1(response.data[0].ServiceCount);
        //         }
        //     })
        // await axios.get('http://localhost:3001/charts/customer/service')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         console.log(response.data);
        //         setTemp2(response.data[0].ServiceCount);
        //         setServiceCount(temp1+temp2);
        //     }
        // })    


        // await axios.get('http://localhost:3001/badges/leads/lastmonthservice')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         setLastTemp1(response.data[0].ServiceCount);
        //     }
        // })
        // await axios.get('http://localhost:3001/badges/customer/lastmonthservice')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         setLastTemp2(response.data[0].ServiceCount);
        //         setLastMonthServiceCount(lasttemp1+lasttemp2);
        //     }
        // })

        // await axios.get('http://localhost:3001/badges/leads/curmonthservice')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         setCurTemp1(response.data[0].ServiceCount);
        //     }
        // })
        // await axios.get('http://localhost:3001/badges/customer/curmonthservice')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         setCurTemp2(response.data[0].ServiceCount);
        //         setCurMonthServiceCount(curtemp1+curtemp2);
        //     }
        // })
    },[])

    return (
        <>
            <Card {...props}>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                        style={{ justifyContent: 'space-around' }}
                    >
                        <Grid item lg={6} md={6} sm={7} xs={7}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h6"
                            >
                                TOTAL SERVICES
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                {serviceCount}
                            </Typography>
                        </Grid>
                        <Grid item lg={2} md={1} sm={1} xs={3}/>
                        <Grid item lg={'28%'} md={4} sm={3} xs={2}>
                            <Avatar
                                classname={classes.large}
                                style={{
                                    backgroundColor: yellow[900],
                                    height: '90%',
                                    width: '90%',
                                    alignContent: 'center'
                                }}
                            >
                                <AssignmentIndIcon />
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item lg={4} md={5} sm={4} xs={3}>
                            <Box
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    pt: 2,
                                }}
                            >
                                {flag && <ArrowUpwardIcon style={{ color: green[900] }} />}
                                {flag && <Typography
                                    variant="body1"
                                    style={{
                                        color: green[900],
                                        mr: 1
                                    }}
                                >
                                    {ans}%
                                </Typography>}
                                {!flag && <ArrowDownwardIcon style={{ color: red[900] }} />}
                                {!flag && <Typography
                                    variant="body1"
                                    style={{
                                        color: red[900],
                                        mr: 1
                                    }}
                                >
                                    {ans}%
                                </Typography>}
                            </Box>
                        </Grid>
                        <Grid item lg={6} md={7} sm={8} xs={4}>
                            <Box
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    pt: 2
                                }}
                            >
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Since last month
                        </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
};