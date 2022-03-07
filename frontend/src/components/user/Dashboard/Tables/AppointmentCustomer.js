import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Chip, Divider, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from '@material-ui/core';
import axios from 'axios';

const AppointmentCustomer = (props) => {
  const [val, setVal] = useState([]);

  useEffect(() => {

    async function fetchData() {

      const response = await axios.get(`http://161.97.79.224:3001/dashboard/appointment/customer`);

      try {
        console.log(response.data);
        if (response.data.length) {
          const ar = response.data.map((elem) => {
            let container = {
              'idappointment': elem.idappointment,
              'name': elem.name,
              'date': new Date(elem.date).toLocaleDateString(),
              'time': new Date(elem.time).toLocaleTimeString(),
              'mode': elem.mode
            }
            return container;
          })
          setVal(ar);
        }
      }
      catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Card {...props} >
        <CardHeader title="Appointment - Customer" style={{ textAlign: 'center' }} />
        <Divider />
        <PerfectScrollbar>
          <Box style={{ minWidth: 550 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    Appointment ID
                  </TableCell>
                  <TableCell align="center">
                    Customer
                  </TableCell>
                  <TableCell sortDirection="desc" align="center">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell sortDirection="desc" align="center">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Time
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    Mode
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {val.map((value) => (
                  <TableRow
                    hover
                    key={value.idappointment}
                  >
                    <TableCell align="center">
                      {value.idappointment}
                    </TableCell>
                    <TableCell align="center">
                      {value.name}
                    </TableCell>
                    <TableCell align="center">
                      {value.date}
                    </TableCell>
                    <TableCell align="center">
                      {value.time}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        color="primary"
                        label={value.mode}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            View all
      </Button>
        </Box> */}
      </Card>
    </>
  );
};
export default AppointmentCustomer;
