import React from 'react';
import { Avatar, Box, Card, CardContent, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TreeIcon from './TreeIcon';

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

export default function AccountProfile(props) {
    const classes = useStyles();

    return (
        <>
            <Card >
                <CardContent style={{ justifyContent: "center", display: "flex" }}>
                    <Box
                        p={3}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Avatar className={classes.large} style={{ color: "#000000", backgroundColor: "#434343" }} alt="Avatar" >
                            <Typography variant="h1" component="h1" style={{ color: "#FFFFFF"}}>
                                {props.userImage}
                            </Typography>
                        </Avatar>
                    </Box>
                </CardContent>
                <CardContent style={{ justifyContent: "center", display: "flex" }}>
                    <Typography variant="h4" component="h2" style={{ color: "#000000"}}>
                        {props.name}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Box
                        p={1}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TreeIcon country={props.country} company={props.company} roleatcompany={props.roleatcompany} phone={props.phone} mail={props.mail} department={props.department} manager={props.managerName} />
                    </Box>
                </CardContent>
                {/* <Divider /> */}
                <CardContent />
            </Card>
        </>
    );
}
