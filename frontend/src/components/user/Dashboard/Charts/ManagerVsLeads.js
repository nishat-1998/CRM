import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, colors, useTheme } from '@material-ui/core';
import axios from 'axios';

const favColor = [colors.indigo[500], colors.red[600], colors.orange[600], colors.yellow[700], colors.green[700]];

const ManagerVsLeads = () => {
    const theme = useTheme();
    const [manager, setManager] = useState([]);
    const [leadCount, setLeadCount] = useState([]);
    const [myfavColor, setMyfavColor] = useState([]);
    const [val, setVal] = useState([]);

    useEffect(() => {
        let name = [];
        let count = [];
        let myColor = [];
        
        async function fetchData() {

            const response = await axios.get(`http://161.97.79.224:3001/charts/leads/manager`);

            try {
                console.log(response.data);
                setVal(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    if (i >= 5) {
                        break;
                    }
                    name.push(response.data[i].first_name);
                    count.push(response.data[i].LeadCount);
                    myColor.push(favColor[i]);
                }
                setManager(name);
                setLeadCount(count);
                setMyfavColor(myColor);
            }

            catch (error) {
                alert(error);
            }

        }
        fetchData();

    }, [])

    const data = {
        datasets: [
            {
                data: leadCount,
                backgroundColor: myfavColor,
                borderWidth: 8,
                borderColor: colors.common.white,
                hoverBorderColor: colors.common.white
            }
        ],
        labels: manager
    };

    const options = {
        animation: false,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        responsive: true,
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
            <CardHeader title="Managerially Generated Leads" style={{ textAlign: 'center' }} />
            <Divider />
            <CardContent>
                <Box
                    style={{
                        height: 300,
                        position: 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default ManagerVsLeads;
