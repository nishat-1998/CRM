import React, { useState, useEffect } from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
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
        width: theme.spacing(50),
        height: theme.spacing(50),
        // color: theme.palette.getContrastText(deepPurple[500]),
        // backgroundColor: red[500]
    },
}));

export default function TotalLeads(props) {
    const classes = useStyles();
    const [leadCount,setLeadCount] = useState(0);
    const [flag,setFlag] = useState(true);
    const [ans,setAns] = useState(0);
    
    useEffect(() =>{

        async function fetchData(){

            const [resLead,resLastLead,resCurLead] = await Promise.all([axios.get('http://161.97.79.224:3001/badges/leads'),axios.get('http://161.97.79.224:3001/badges/lastmonthleads'), axios.get('http://161.97.79.224:3001/badges/curmonthleads')]);
             
            try {
                console.log(resLead.data);
                setLeadCount(resLead.data[0].LeadsCount);
                let cur = resCurLead.data[0].LeadsCount;
                let prev = resLastLead.data[0].LeadsCount;
                console.log(cur, prev);
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
            catch (error) {
                alert(error);
            }
        }
        fetchData();

        // await axios.get('http://localhost:3001/badges/leads')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         console.log(response.data);
        //         setLeadCount(response.data[0].LeadsCount);
        //     }
        // })
        // await axios.get('http://localhost:3001/badges/lastmonthleads')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         setLastMonthLeadCount(response.data[0].LeadsCount);
        //     }
        // })
        // await axios.get('http://localhost:3001/badges/curmonthleads')
        // .then((response) => {
        //     if (response.data.err) {
        //         alert(response.data.err)  // use React Toastify !
        //     } else {
        //         setCurMonthLeadCount(response.data[0].LeadsCount);
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
                        justify="space-around"
                    >
                        <Grid item lg={5} md={5} sm={5} xs={7}>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="h6"
                            >
                                TOTAL LEADS
                            </Typography>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                {leadCount}
                            </Typography>
                        </Grid>
                        <Grid item lg={2} md={2} sm={3} xs={3}/>
                        <Grid item lg={'40%'} md={4} sm={3} xs={2}>
                            <Avatar
                                classname={classes.large}
                                style={{
                                    backgroundColor: green[600],
                                    height: '90%',
                                    width: '90%',
                                    alignContent: 'center'
                                }}
                            >
                                <PeopleIcon />
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