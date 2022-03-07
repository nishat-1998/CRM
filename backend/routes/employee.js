var express = require('express');
var app = express();
var db = require('../config/db');

app.get("/employee/getemployee",(req,res)=>
{
    db.query("SELECT * FROM employee",
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

app.get("/employee/getemployee/:id",(req,res) => {
    let id = req.params.id;
    db.query(`SELECT * FROM employee WHERE idemployee = ?`,
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

// For Admin:
app.get("/admin/getadmin/:id",(req,res) => {
    let id = req.params.id;
    db.query(`SELECT * FROM admin WHERE idAdmin = ?`,
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

app.get("/employee/getemployeeforManager",(req,res)=>
{
    const manager_id = req.query.manager_id
    db.query("SELECT first_name FROM manager where idmanager =?",
            [manager_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send(err)
                }else{
                    console.log(result.data)
                  const manager = result;
        db.query("SELECT * FROM employee where manager_id =? ",
        [manager[0].first_name],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                console.log(result.data)
                res.send(result);
            }
        })
    }
            })
    }
)

app.put("/updateemployee",(req,res)=>{
    
    const name = req.body.name
    const contact = req.body.contact    
    const role = req.body.role
    const mail = req.body.mail
    const ssid = req.body.ssid
    const department = req.body.department
    const company = req.body.company
    const idemployee = req.body.idemployee
    const country = req.body.country
    console.log(idemployee)
    db.query("UPDATE employee SET first_name=?, company=?, phonenumber=?, mail=?, role=?, ssid=?, department=?, country=? WHERE idemployee=?",
    [name, company, contact, mail, role, ssid, department,country,idemployee],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
    })

app.put("/deleteemployee",(req,res)=>{
    const idemployee = req.body.idemployee
    console.log(idemployee);
     db.query("DELETE FROM employee WHERE idemployee = ? ",
     [ idemployee],
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