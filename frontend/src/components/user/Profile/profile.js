import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import AccountProfile from './sections/AccountProfile';
import AccountProfileDetails from './sections/AccountProfileDetails';

export default function Profilepage() {
    const [row, setRow] = useState({});
    const { role } = useParams();
    const { id } = useParams();
    const [name, setName] = useState('');
    const [mail, setMail] = useState();
    const [roleatcompany, setRoleatcompany] = useState();
    const [company, setCompany] = useState();
    const [phone, setPhone] = useState();
    const [department, setDepartment] = useState();
    const [password, setPassword] = useState();
    const [country, setCountry] = useState();

    useEffect(() => {
        let getData = async () => {
            const response = await Axios.get(`http://161.97.79.224:3001/${role}/get${role}/${id}`);
            try {
                console.log(response.data);
                setRow(response.data[0]);
                setMail(response.data[0].mail);
                setCompany(response.data[0].company);
                setName(response.data[0].first_name);
                setPhone(response.data[0].phonenumber);
                setRoleatcompany(response.data[0].role);
                setDepartment(response.data[0].department);
                setPassword(response.data[0].password);
                setCountry(response.data[0].country);
            }
            catch (error) {
                alert(error);
            }
        };
        getData();
    }, [row])


    return (
        <>
            <Helmet>
                <title>Profile | Custom Relationship Management</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth="lg">
                    <Grid
                        container
                        spacing={4}
                        justify="space-evenly"
                    >
                        <Grid
                            item
                            xl={4}
                            lg={5}
                            md={6}
                            sm={12}
                            xs={12}
                        >
                            <AccountProfile name={name} company={company} roleatcompany={roleatcompany} phone={phone} mail={mail} department={department} id={id} role={role} userImage={name && name.charAt(0).toUpperCase()} country={country} />
                        </Grid>
                        <Grid
                            item
                            xl={8}
                            lg={7}
                            md={10}
                            sm={12}
                            xs={12}
                        >
                            <AccountProfileDetails name={name} company={company} roleatcompany={roleatcompany} phone={phone} mail={mail} department={department} password={password} id={id} role={role} country={country} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}