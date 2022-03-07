var express = require('express');
var app = express();
var db = require('../config/db');

app.get("/manager/getmanager",(req,res)=>
{
    db.query("SELECT * FROM manager",
    (err,result)=>{
        if(err){
            console.log(err);
            res.send(err)
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    
    
    )
}
)

app.get("/manager/getmanager/:id",(req,res) => {
    let id = req.params.id;
    db.query(`SELECT * FROM manager WHERE idmanager = ?`,
    [id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send(err)
        }else{
            console.log(result.data)
            res.send(result);
        }
    })
})

app.put("/updatemanager",(req,res)=>{
    const name = req.body.name
    const contact = req.body.contact    
    const role = req.body.role
    const mail = req.body.mail
    const ssid = req.body.ssid
    const department = req.body.department
    const company = req.body.company
    const idmanager = req.body.idmanager
    const country = req.body.country
    db.query("UPDATE manager SET first_name=?, company=?, phonenumber=?, mail=?, role=?, ssid=?, department=?, country=? WHERE idmanager=?",
    [name, company, contact, mail, role, ssid, department,country,idmanager],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
    })

app.put("/deletemanager",(req,res)=>{
    const idmanager = req.body.idmanager
     db.query("DELETE FROM manager WHERE idmanager = ? ",
     [ idmanager],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
 })

module.exports = app;