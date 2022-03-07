var express = require('express');
var app = express();
var db = require('../config/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

app.post('/manager/profile/:id', (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const phone = req.body.phone;
    const company = req.body.company;
    const country = req.body.country;
    const department = req.body.department;
    const role = req.body.roleatcompany;
    const id = req.params.id;

        db.query("UPDATE manager SET first_name = ?, mail = ?, phonenumber = ?, company = ?, country = ?, department = ?, role = ? WHERE idmanager = ?",
            [name, mail, phone, company, country, department, role, id],
            (err, result) => {
                if (err) {
                    res.send({ message: "User doesn't exist" });
                } else {
                    res.send(result);
                    console.log(result);
                }
            })
});


app.post('/employee/profile/:id', (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const phone = req.body.phone;
    const company = req.body.company;
    const country = req.body.country;
    const department = req.body.department;
    const role = req.body.roleatcompany;
    const id = req.params.id;

    db.query("UPDATE employee SET first_name = ?, mail = ?, phonenumber = ?, company = ?, country = ?, department = ?, role = ? WHERE idemployee = ?",
        [name, mail, phone, company, country, department, role, id],
        (err, result) => {
            if (err) {
                res.send({ message: "User doesn't exist" });
            } else {
                res.send(result);
                console.log(result);
            }
        })
});

app.post('/employee/profile/reset-password/:id', (req, res) => {
    const password1=req.body.password1;
    const password2=req.body.password2;
    const id = req.params.id;
    if (password1 !== password2) {
        res.send({ message: "Please make sure your passwords match" });
    }

    bcrypt.hash(password1, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("UPDATE employee SET password = ? WHERE idemployee = ?",
            [hash,id],
            (err, result) => {
                if (err) {
                    res.send({ message: "err" });
                } else {
                    res.send(result);
                    console.log(result);
                }
            })
        })
});

app.post('/manager/profile/reset-password/:id', (req, res) => {
    const password1=req.body.password1;
    const password2=req.body.password2;
    const id = req.params.id;
    if (password1 !== password2) {
        res.send({ message: "Please make sure your passwords match" });
    }

    bcrypt.hash(password1, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("UPDATE manager SET password = ? WHERE idmanager = ?",
            [hash,id],
            (err, result) => {
                if (err) {
                    res.send({ message: "err" });
                } else {
                    res.send(result);
                    console.log(result);
                }
            })
        })
});



module.exports = app;