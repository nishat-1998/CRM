var express = require('express');
var app = express();
var db = require('../config/db');


//Refer customer folder in frontend
  app.post ("/appointment/customer",(req,res)=>
{
const mode = req.body.mode
const date = req.body.date   
const time = req.body.time
const managerId = req.body.managerId
const customerId = req.body.customerId
const employeeId = req.body.employeeId
const description = req.body.description

      if(managerId === employeeId){
        db.query("INSERT INTO appointment (date,time, customer_id,mode,description) VALUES(?,?,?,?,?)",
        [date,time,customerId,mode,description],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send({message:"err"})
            }else{
                res.send(result)
                console.log(result)
            }
           
        })
      }
else if(managerId === "NULL"){
    db.query("SELECT first_name FROM employee where idemployee=?",
    [employeeId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const employee = result;
    db.query("INSERT INTO appointment (date,time, customer_id, employee_id,mode,description) VALUES(?,?,?,?,?,?)",
    [date,time,customerId,employee[0].first_name,mode,description],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            res.send(result+{employee})
            console.log(result)
        }
       
    })
}
       
})
}else{
    db.query("SELECT first_name FROM manager where idmanager=?",
    [managerId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const manager = result;
      db.query("INSERT INTO appointment (date,time, customer_id, manager_id,mode,description) VALUES(?,?,?,?,?,?)",
      [date,time,customerId,manager[0].first_name,mode,description],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            res.send(result)
            console.log(result)
        }
       
    })
}
    })
}
       
});
app.post ("/appointment/lead",(req,res)=>
{
const mode = req.body.mode
const date = req.body.date   
const time = req.body.time
const managerId = req.body.managerId
const leadId = req.body.leadId
const employeeId = req.body.employeeId
const description = req.body.description

db.query("SELECT name FROM leads where idleads=?",
    [leadId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const lead = result;
      if(managerId===employeeId){
        db.query("INSERT INTO appointment (date,time, lead_id,mode,description) VALUES(?,?,?,?,?)",
        [date,time,lead[0].name,mode,description],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send({message:"err"})
            }else{
                res.send(result)
                console.log(result)
            }
           
        })
      }
else if(managerId === "NULL"){
    db.query("SELECT first_name FROM employee where idemployee=?",
    [employeeId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const employee = result;
    db.query("INSERT INTO appointment (date,time, lead_id, employee_id,mode,description) VALUES(?,?,?,?,?,?)",
    [date,time,lead[0].name,employee[0].first_name,mode,description],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            res.send(result+{employee})
            console.log(result)
        }
       
    })
}
       
})
}else{
    db.query("SELECT first_name FROM manager where idmanager=?",
    [managerId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const manager = result;
      db.query("INSERT INTO appointment (date,time, lead_id, manager_id,mode,description) VALUES(?,?,?,?,?,?)",
      [date,time,lead[0].name,manager[0].first_name,mode,description],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            res.send(result)
            console.log(result)
        }
       
    })
}
    })
}
        }
    })
   
});
app.put("/appointment/updatecount",(req,res)=>{
    const leadId = req.body.leadId
    const count = req.body.count
db.query("UPDATE leads SET count = ?  WHERE idleads = ? ",
[count,leadId],
(err,result)=>{
    if(err){
        console.log(err);
    }else{
       
        console.log(result)
        res.send(result);
    }
})
})
app.get("/getmeetings",(req,res)=>
    {
        const customer_id =req.query.customer_id
       
            db.query("SELECT * FROM appointment where customer_id =?",
            [customer_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send(err)
                }else{
                    console.log(result.data)
                 res.send(result)
        
    }
            })
    
    }
    )
    app.get("/getmeetings/lead",(req,res)=>
    {
        const lead_id =req.query.leadId
       
            db.query("SELECT * FROM appointment where lead_id =?",
            [lead_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send(err)
                }else{
                    console.log(result.data)
                 res.send(result)
        
    }
            })
    
    }
    )

module.exports = app;