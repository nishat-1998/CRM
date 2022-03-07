import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, colors } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';

const Services = () => {
  const theme = useTheme();
  let ar = [0, 0, 0, 0, 0, 0, 0];
  const [leadCount, setLeadCount] = useState(ar);
  const [customerCount, setCustomerCount] = useState(ar);
  const [label, setLabel] = useState(ar);

  useEffect(() => {
    let tleadCount = [0, 0, 0, 0, 0, 0, 0];
    let tcustomerCount = [0, 0, 0, 0, 0, 0, 0];
    let tlabel = [0, 0, 0, 0, 0, 0, 0];

    async function fetchData() {

      for (let i = 0; i <= 6; i++) {
        const [resLeadService, resCustomerService] = await Promise.all([axios.get(`http://161.97.79.224:3001/charts/leads/service/${i}`), axios.get(`http://161.97.79.224:3001/charts/customer/service/${i}`)]);

        try {
          console.log(resLeadService.data);
          console.log(resCustomerService.data);
          tleadCount[i] = resLeadService.data[0].ServiceCount;
          tcustomerCount[i] = resCustomerService.data[0].ServiceCount;
          let today = new Date();
          let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
          let mnth = nextweek.toString().substr(4, 3);
          let day = nextweek.toString().substr(8, 2);
          let ans = day + " " + mnth;
          tlabel[i] = ans;
        }
        catch (error) {
          alert(error);
        }
      }
      setLeadCount(tleadCount);
      setCustomerCount(tcustomerCount);
      setLabel(tlabel);
    }

    fetchData();

    // await axios.get(`http://localhost:3001/charts/leads/service/${i}`)
    //   .then((response) => {
    //     if (response.data.err) {
    //       alert(response.data.err)  // use React Toastify !
    //     } else {
    //       console.log(response.data);
    //       tleadCount[i]=response.data[0].ServiceCount;
    //     }
    //   })
    //  await axios.get(`http://localhost:3001/charts/customer/service/${i}`)
    //   .then((response) => {
    //     if (response.data.err) {
    //       alert(response.data.err)  // use React Toastify !
    //     } else {
    //       console.log(response.data);
    //       tcustomerCount[i]=response.data[0].ServiceCount;
    //     }
    //   })

  }, [])


  const data = {
    datasets: [
      {
        backgroundColor: colors.green[700],
        borderColor: 'rgba(0,0,0,1)',
        data: leadCount,
        label: 'Leads'
      },
      {
        backgroundColor: colors.red[600],
        borderColor: 'rgba(0,0,0,1)',
        data: customerCount,
        label: 'Customers'
      }
    ],
    labels: label
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: true,
            drawBorder: true
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card >
      <CardHeader
        action={(
          <Button
            endIcon={<ArrowDropDownIcon />}
            size="small"
            variant="text"
          >
            Last 7 days
          </Button>
        )}
        title="Services"
      />
      <Divider />
      <CardContent>
        <Box
          style={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Services;