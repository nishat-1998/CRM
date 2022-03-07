import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import SwipeableViews from 'react-swipeable-views';
import {useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
//external files
import Departments from "./department";
import Projects from "./project";
import Password from "./changePassword"

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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div >
       <Helmet>
      <title>Settings | Custom Relationship Management</title>
    </Helmet>
      <Container component="main">
          <CssBaseline />
      <AppBar position="static" color="inherit" elevation={0}>
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Departments" {...a11yProps(0)} />
          <Tab label="Projects" {...a11yProps(1)} />
          <Tab label="Profile" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Departments/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Projects/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Password/>
        </TabPanel>
      </SwipeableViews>
      </Container>
    </div>
  );
}
