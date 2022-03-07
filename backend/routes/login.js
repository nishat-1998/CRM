var express = require('express');
var app = express();
var db = require('../config/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');
const moment = require('moment-timezone');
require('dotenv').config();
const saltRounds = 10;

function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

const transport = nodemailer.createTransport(
    smtp({
      host:process.env.MAILJET_HOST,
      port: process.env.MAILJET_PORT,
      secure: false,
      auth: {
        user: process.env.MAILJET_API_KEY ,
        pass: process.env.MAILJET_API_SECRET,
    },
}));

app.post ("/admin/login",(req,res)=>
{
const username = req.body.username
const password = req.body.password


    db.query("SELECT * FROM admin WHERE name=?;" ,
    [username],
    (err,result)=>{
        if(err){
            res.send({err: err});
        }else{
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (err, response)=>
               {
                   if(response){
                    console.log(response)
                       res.send(result);
                   }else{
                    res.send({message:"Wrong username or password"})
                    console.log(err)
                   }
               })
            }else{
                res.send({message:"User doesn't exist"})   
            }
        }  
    })
})

app.post ("/manager/login",(req,res)=>
{
const username = req.body.username
const password = req.body.password


    db.query("SELECT * FROM manager WHERE mail=?;" ,
    [username],
    (err,result)=>{
        if(err){
            res.send({err: err});
        }else{
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (err, response)=>
               {
                   if(response){
                    console.log(response)
                       res.send(result);
                   }else{
                    res.send({message:"Wrong username or password"})
                    console.log(err)
                   }
               })
            }else{
                res.send({message:"User doesn't exist"})
                
            }

        }
       
    })
})
app.post ("/employee/login",(req,res)=>
{
const username = req.body.username
const password = req.body.password


    db.query("SELECT * FROM employee WHERE mail=?;" ,
    [username],
    (err,result)=>{
        if(err){
            res.send({err: err});
        }else{
            if(result.length > 0){
               bcrypt.compare(password, result[0].password, (err, response)=>
               {
                   if(response){
                       res.send(result);
                       console.log(response)
                   } else {
                    res.send({message:"Wrong username or password"})
                   }
               })
            } else {
                res.send({message:"User doesn't exist"})
            }
        }
    })
})

app.post("/employee/reset-password/:token",(req,res) => {
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const token = req.params.token;
    if (password1 !== password2) {
        res.send({ message: "Please make sure your passwords match" });
    }
    bcrypt.hash(password1, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("UPDATE employee SET password = ? WHERE resetToken = ?",
            [hash,token],
            (err, result) => {
                if (err) {
                    res.send({ message: "err" });
                } else {
                    res.send(result);
                    console.log(result);
                }
            })
    })
})

app.post("/manager/reset-password/:token",(req,res) => {
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const token = req.params.token;
    if (password1 !== password2) {
        res.send({ message: "Please make sure your passwords match" });
    }
    bcrypt.hash(password1, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("UPDATE manager SET password = ? WHERE resetToken = ?",
            [hash,token],
            (err, result) => {
                if (err) {
                    res.send({ message: "err" });
                } else {
                    res.send(result);
                    console.log(result);
                }
            })
    })
})

app.post("/admin/reset-password/:token",(req,res) => {
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const token = req.params.token;
    if (password1 !== password2) {
        res.send({ message: "Please make sure your passwords match" });
    }
    bcrypt.hash(password1, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }
        db.query("UPDATE admin SET password = ? WHERE resetToken = ?",
            [hash,token],
            (err, result) => {
                if (err) {
                    res.send({ message: "err" });
                } else {
                    res.send(result);
                    console.log(result);
                }
            })
    })
})

app.post("/employee/resetpassword",(req,res) => {
    const mail = req.body.username;
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            console.log(err);
            res.send({err: err});
        } 
        const token = buffer.toString('hex');
        console.log(token);
        let resetToken = token;
        let date = Date.now() + 3600000;
        let expireToken = moment(date).format();
        db.query("UPDATE employee SET resetToken = ?, expireToken = ? WHERE mail = ?",
        [resetToken,expireToken,mail],
        (error,result) => {
            if(error){
                console.log(error);
                res.send({message: "User doesn't exist"});
            } else {
                transport.sendMail({
                    from: "info@engagenreap.com",
                    to: mail,
                    subject: "Reset password",
                    html: `
                    <p>You requested for password reset</p>
                    <h4>Click on this <a href="http:161.97.79.224:3005/employee/reset-password/${token}">link</a> to reset password</h4>
                    `
                    } , (errr,info) => {
                        if(errr){
                            console.log(errr);
                        } else {
                            console.log('Email sent ' + info.response);
                            // res.json({message: "Check your mail!"});
                        }
                    })
                    res.json({message: "Check your mail!",
                            result: result});
            }
        })
    })
})

app.post("/manager/resetpassword",(req,res) => {
    const mail = req.body.username;
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            console.log(err);
            res.send({err: err});
        } 
        const token = buffer.toString('hex');
        let resetToken = token;
        let date = Date.now() + 3600000;
        let expireToken = moment(date).format();
        db.query("UPDATE manager SET resetToken = ?, expireToken = ? WHERE mail = ?",
        [resetToken,expireToken,mail],
        (error,result) => {
            if(error){
                console.log(error);
                res.send({message: "User doesn't exist"});
            } else {
                transport.sendMail({
                    from: "info@engagenreap.com",
                    to: mail,
                    subject: "Reset password",
                    html: `
                    <p>You requested for password reset</p>
                    <h4>Click on this <a href="http://161.97.79.224:3005/manager/reset-password/${token}">link</a> to reset password</h4>
                    `
                    } , (errr,info) => {
                        if(errr){
                            console.log(errr);
                        } else {
                            console.log('Email sent ' + info.response);
                            // res.json({message: "Check your mail!"});
                        }
                    })
                res.json({message: "Check your mail!",
                        result: result});
            }
        })
    })
})

app.post("/admin/resetpassword",(req,res) => {
    const mail = req.body.username;
    crypto.randomBytes(32,(err,buffer) => {
        if(err){
            console.log(err);
            res.send({err: err});
        } 
        const token = buffer.toString('hex');
        let resetToken = token;
        let date = Date.now() + 3600000;
        let expireToken = moment(date).format();
        db.query("UPDATE admin SET resetToken = ?, expireToken = ? WHERE name = ?;",
        [resetToken,expireToken,mail],
        (error,result) => {
            if(error){
                console.log(error);
                res.send({message: "User doesn't exist"});
            } else {
                transport.sendMail({
                    from: "info@engagenreap.com",
                    to: mail,
                    subject: "Reset password",
                    html: `
                    <p>You requested for password reset</p>
                    <h4>Click on this <a href="http:161.97.79.224:3005/admin/reset-password/${token}">link</a> to reset password</h4>
                    `
                    } , (errr,info) => {
                        if(errr){
                            console.log(errr);
                        } else {
                            console.log('Email sent ' + info.response);
                            // res.json({message: "Check your mail!"});
                        }
                    })
                    res.json({message: "Check your mail!",
                            result: result});
            }
        })
    })
})

module.exports = app;