const express = require('express');
const app = express();
const db = require('../config/db');

// Leads Vs Agent
app.get('/charts/leads/agent', (req, res) => {
    db.query(`SELECT agent,COUNT(agent) AS LeadCount
        FROM leads
        GROUP BY agent
        ORDER BY LeadCount DESC`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/charts/leads/agent/:day', (req, res) => {
    let paramDay = req.params.day;
    db.query(`SELECT datetime,agent,COUNT(agent) AS LeadCount
        FROM leads
        GROUP BY agent
        HAVING DAY(datetime)=DAY(NOW()) - ?   
        ORDER BY LeadCount DESC`,                       // check date field (DATE OR DATETIME ?)
        [paramDay],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

// Employee/Manager Vs Leads
app.get('/charts/leads/:role', (req, res) => {
    let role = req.params.role;
    if (role === 'employee') {
        db.query(`SELECT first_name,COUNT(*) AS LeadCount
        FROM leads
        JOIN employee
        ON leads.employee_id=employee.first_name
        GROUP BY first_name
        ORDER BY LeadCount DESC`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    console.log(result.data)
                    res.send(result);
                }
            })
    }
    else if (role === 'manager') {
        db.query(`SELECT first_name,COUNT(*) AS LeadCount
        FROM leads
        JOIN manager
        ON leads.manager_id=manager.first_name
        GROUP BY first_name
        ORDER BY LeadCount DESC`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                } else {
                    console.log(result.data)
                    res.send(result);
                }
            })
    }
});

// Service Vs Leads
app.get('/chart/leads/servicecount', (req, res) => {
    db.query(`SELECT COUNT(service) AS ServiceCount
    FROM leads`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/charts/leads/service/:day', (req, res) => {
    let paramDay = req.params.day;
    db.query(`SELECT COUNT(service) AS ServiceCount
    FROM leads
    WHERE DAY(datetime)=DAY(NOW()) - ?`,  // check date field (DATE OR DATETIME ?)
        [paramDay],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

// Service Vs Customer
app.get('/charts/customer/service', (req, res) => {
    db.query(`SELECT COUNT(service) AS ServiceCount
    FROM customer`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/charts/customer/service/:day', (req, res) => {
    let paramDay = req.params.day;
    db.query(`SELECT COUNT(service) AS ServiceCount
    FROM customer
    WHERE DAY(date)=DAY(NOW()) - ?`,  // check date field (DATE OR DATETIME ?)
        [paramDay],                       // Can also use this -> WHERE DATE(date)=CURDATE() - INTERVAL ? DAY
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

// Badges -> Total Leads
app.get('/badges/leads', (req, res) => {
    db.query(`SELECT COUNT(idleads) AS LeadsCount
    FROM leads`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/lastmonthleads', (req, res) => {
    db.query(`SELECT COUNT(idleads) AS LeadsCount
    FROM leads
    WHERE MONTH(datetime)=MONTH(NOW())-1`,  // check date field (DATE OR DATETIME ?)
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/curmonthleads', (req, res) => {
    db.query(`SELECT COUNT(idleads) AS LeadsCount
    FROM leads
    WHERE MONTH(datetime)=MONTH(NOW())`,  // check date field (DATE OR DATETIME ?)
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});


// Badges -> Total Customer
app.get('/badges/customer', (req, res) => {
    db.query(`SELECT COUNT(idcustomer) AS CustomerCount
    FROM customer`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/lastmonthcustomer', (req, res) => {
    db.query(`SELECT COUNT(idcustomer) AS CustomerCount
    FROM customer
    WHERE MONTH(date)=MONTH(NOW())-1`,  // check date field (DATE OR DATETIME ?)
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/curmonthcustomer', (req, res) => {
    db.query(`SELECT COUNT(idcustomer) AS CustomerCount
    FROM customer
    WHERE MONTH(date)=MONTH(NOW())`,  // check date field (DATE OR DATETIME ?)
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

// Badges -> Total Services

app.get('/badges/leads/lastmonthservice', (req, res) => {
    db.query(`SELECT COUNT(service) AS ServiceCount
    FROM leads
    WHERE MONTH(datetime)=MONTH(NOW())-1`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/leads/curmonthservice', (req, res) => {
    db.query(`SELECT COUNT(service) AS ServiceCount
    FROM leads
    WHERE MONTH(datetime)=MONTH(NOW())`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/customer/lastmonthservice', (req, res) => {
    db.query(`SELECT COUNT(service) AS ServiceCount
        FROM customer
        WHERE MONTH(date)=MONTH(NOW())-1`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/badges/customer/curmonthservice', (req, res) => {
    db.query(`SELECT COUNT(service) AS ServiceCount
        FROM customer
        WHERE MONTH(date)=MONTH(NOW())`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

// Table -> Upcoming Appointments for Leads
app.get('/dashboard/appointment/leads', (req, res) => {
    db.query(`SELECT idappointment,name,appointment.date,mode,time
    FROM appointment
    JOIN leads
    ON appointment.lead_id=leads.name
    WHERE lead_id IS NOT NULL
    HAVING appointment.date > NOW()`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

// Table -> Upcoming Appointments for Customer
app.get('/dashboard/appointment/customer', (req, res) => {
    db.query(`SELECT idappointment,name,appointment.date,mode,time
    FROM appointment
    JOIN customer
    ON appointment.customer_id=customer.name
    WHERE customer_id IS NOT NULL
    HAVING appointment.date > NOW()`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
});

app.get('/dashboard/country',(req,res) => {
    db.query(`SELECT z.country,SUM(z.LeadCount) AS LeadCount,SUM(z.CustomerCount) AS CustomerCount
    FROM ( SELECT x.country,x.LeadCount,x.CustomerCount
    FROM ( SELECT country, COUNT(idleads) as LeadCount, 0 as CustomerCount
    FROM leads
    GROUP BY country) x
    UNION
    SELECT y.country,y.LeadCount,y.CustomerCount
    FROM ( SELECT country, 0 as LeadCount, COUNT(idcustomer) as CustomerCount
    FROM customer
    GROUP BY country) y ) z
    GROUP BY z.country`,
        (err,result) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                console.log(result.data)
                res.send(result);
            }
        })
})

module.exports = app;