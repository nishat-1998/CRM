var express = require('express');
var app = express();
var db = require('../config/db');


function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
  app.post ("/status/leads",(req,res)=>
{
const mode = req.body.mode
const date = req.body.date   
const time = req.body.time
const managerId = req.body.managerId
const status = req.body.status
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
      if(managerId === employeeId){
          //Admin
        db.query("INSERT INTO status (date,time, leadid,mode,description,status) VALUES(?,?,?,?,?,?)",
        [date,time,lead[0].name,mode,description,status],
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
    //employee
    db.query("SELECT first_name,total_customers FROM employee where idemployee=?",
    [employeeId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const employee = result;
      var count = result[0].total_customers
      count++;
    db.query("INSERT INTO status (date,time, leadid, employeeid,mode,description,status) VALUES(?,?,?,?,?,?,?)",
    [date,time,lead[0].name,employee[0].first_name,mode,description,status],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            if(status === "Unsuccessful"){
                const title = `Lead ${lead[0].name} status set to Unsuccessful` 
                db.query("INSERT INTO notification (title,employee,time) VALUES (?,?,?)",
              [title,employee[0].first_name,time],
                  (err,result)=>{
                      if(err){
            console.log(err);
                      }else{
                      
            console.log(result)
                      }
                      })
            }else if(status === "Successful"){
                db.query("UPDATE employee SET total_customers=? WHERE first_name=?",
                [count,employee[0].first_name],
                 (err,result)=>{
                     if(err){
                         console.log(err);
                     }else{
                        
                         console.log(result)
                     }
                 })
            }
            res.send(result)
            console.log(result)
        }
       
    })
}
       
})
}else{
   //manager page
    db.query("SELECT first_name,total_customers FROM manager where idmanager=?",
    [managerId],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const manager = result;
      var count = result[0].total_customers
      count++;
      db.query("INSERT INTO status (date,time, leadid, managerid,mode,description,status) VALUES(?,?,?,?,?,?,?)",
      [date,time,lead[0].name,manager[0].first_name,mode,description,status],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            if(status === "Unsuccessful"){
            const title = `Lead ${lead[0].name} status set to Unsuccessful` 
            db.query("INSERT INTO notification (title,manager,time) VALUES (?,?,?)",
          [title,manager[0].first_name,time],
              (err,result)=>{
                  if(err){
        console.log(err);
                  }else{
                  
        console.log(result)
                  }
                  })
                }else if(status === "Successful"){
                    db.query("UPDATE manager SET total_customers=? WHERE first_name=?",
                    [count,manager[0].first_name],
                     (err,result)=>{
                         if(err){
                             console.log(err);
                         }else{
                            
                             console.log(result)
                         }
                     })
                }
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

app.put("/status/updatestatus",(req,res)=>{
    const leadId = req.body.leadId
    const status = req.body.status
    db.query("UPDATE leads SET status = ?  WHERE idleads = ? ",
    [status,leadId],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(result)
            res.send(result);
        }
    })
})


app.post("/status/uploadToCustomer",(req,res)=>{
    const leadId = req.body.leadId
    const date = req.body.date
    db.query("SELECT * FROM leads WHERE idleads = ? ",
    [leadId],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
           
            console.log(result)
            const lead = result;
            db.query("INSERT INTO customer (idcustomer,name,company, contact, mail, website, service,agent,date,employee_id,manager_id,country) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
            [UUID(),lead[0].name, lead[0].company, lead[0].contact, lead[0].mail, lead[0].website, lead[0].service, lead[0].agent,date,lead[0].employee_id,lead[0].manager_id,lead[0].country],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send({message:"err"})
                }else{
                    const title = `Lead ${lead[0].name} status set to Successful and converted into customer` 
                    db.query("INSERT INTO notification (title,employee,manager,time) VALUES (?,?,?,?)",
                    [title,lead[0].employee_id,lead[0].manager_id,date],
                    (err,result)=>{
                        if(err){
                    console.log(err);
                   
                        }else{
                        
                    console.log(result)
                   
                        }
                        })
                        res.send(result)
                    console.log(result)
                }
               
            })
        
        }
    })
})



app.get("/getstatus",(req,res)=>
    {
        const lead_id =req.query.leadId
       
            db.query("SELECT * FROM status where leadid =?",
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