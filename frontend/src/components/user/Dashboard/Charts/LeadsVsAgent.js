import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme, colors } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';

const LeadsVsAgent = () => {
  const theme = useTheme();
  let ar = [0, 0, 0, 0, 0, 0, 0];
  const [mail, setMail] = useState(ar);
  const [phonecall, setPhonecall] = useState(ar);
  const [socialmedia, setSocialmedia] = useState(ar);
  const [others, setOthers] = useState(ar);
  // const [val, setVal] = useState([]);
  const [label, setLabel] = useState(ar);

  useEffect(() => {
    let tmail = [0, 0, 0, 0, 0, 0, 0];
    let tphonecall = [0, 0, 0, 0, 0, 0, 0];
    let tsocialmedia = [0, 0, 0, 0, 0, 0, 0];
    let tothers = [0, 0, 0, 0, 0, 0, 0];
    let tlabel = [0, 0, 0, 0, 0, 0, 0];

    async function fetchData() {

      for (let i = 0; i <= 6; i++) {
        const response = await axios.get(`http://161.97.79.224:3001/charts/leads/agent/${i}`);
        try {
          console.log(response.data);
          // setVal(response.data);
          let val = response.data;
          let count = 0;
          val.forEach((elem) => {
            if (elem.agent === "mail") {
              tmail[i] = elem.LeadCount;
              console.log(elem.LeadCount);
            } else if (elem.agent === 'phone call') {
              tphonecall[i] = elem.LeadCount;
            } else if (elem.agent === 'social media') {
              tsocialmedia[i] = elem.LeadCount;
            } else {
              count = count + elem.LeadCount;
            }
          })
          tothers[i] = count;
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

      setMail(tmail);
      setPhonecall(tphonecall);
      setSocialmedia(tsocialmedia);
      setOthers(tothers);
      setLabel(tlabel);

    }

    fetchData();

  }, [])


  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[600],
        data: mail,
        label: 'Mail'
      },
      {
        backgroundColor: colors.red[900],
        data: phonecall,
        label: 'Phone Call'
      },
      {
        backgroundColor: colors.yellow[700],
        data: socialmedia,
        label: 'Social Media'
      },
      {
        backgroundColor: colors.grey[800],
        data: others,
        label: 'Others'
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
            display: false,
            drawBorder: false
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
        title="Latest Leads"
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

export default LeadsVsAgent;
