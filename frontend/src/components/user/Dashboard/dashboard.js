import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import TotalLeads from './Badges/TotalLeads';
import TotalCustomers from './Badges/TotalCustomers';
import LeadsVsAgent from './Charts/LeadsVsAgent';
import TotalServices from './Badges/TotalServices';
import Services from './Charts/Services';
import EmployeeVsLeads from './Charts/EmployeeVsLeads';
import ManagerVsLeads from './Charts/ManagerVsLeads';
import AppointmentLeads from './Tables/AppointmentLeads';
import AppointmentCustomer from './Tables/AppointmentCustomer';
import Country from './Charts/Country';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard | Custom Relationship Management</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={4}
          justify="space-evenly"
        >
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            <TotalLeads />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={6}
            xs={12}
          >
            <TotalServices />
          </Grid>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Country />
          </Grid>
          <Grid
            item
            xl={7}
            lg={7}
            md={12}
            sm={12}
            xs={12}
          >
            <LeadsVsAgent />
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            md={12}
            sm={12}
            xs={12}
          >
            <Services />
          </Grid>

          <Grid
            item
            xl={6}
            lg={6}
            md={10}
            sm={12}
            xs={12}
          >
            <EmployeeVsLeads />
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={10}
            sm={12}
            xs={12}
          >
            <ManagerVsLeads />
          </Grid>
          <Grid
            item
            xl={6}
            lg={10}
            md={10}
            sm={11}
            xs={11}
          >
            <AppointmentLeads />
          </Grid>
          <Grid
            item
            xl={6}
            lg={10}
            md={10}
            sm={11}
            xs={11}
          >
            <AppointmentCustomer />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;