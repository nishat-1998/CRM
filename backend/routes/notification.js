var express = require('express');
var app = express();
var db = require('../config/db');

app.get("/notification/getnotificationForAdmin",(req,res)=>
    {
        //admin page
        db.query("SELECT * FROM notification",
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                res.send(result);
            }
        })
            })
 
app.get("/notification/getnotification",(req,res)=>
{
    const manager_id =req.query.manager_id
    if(manager_id==="NULL"){
        console.log("loading")
    }
   else{    db.query("SELECT first_name FROM manager where idmanager = ?",
   [manager_id],
   (err,result)=>{
       if(err){
           console.log(err);
           res.send(err)
       }else{
           console.log(result.data)
           managerId = result[0].first_name
           employeeId = "NULL"
         const manager = result;
         db.query("call notificationDataWRTManager(?)", //Stored procedure
       [manager[0].first_name],
       (err,result)=>{
           if(err){
               console.log(err);
               res.send(err)
           }else{
               console.log(result[0])
               
            res.send(result[0])
           }
})
}
})
}
}
)


       
    app.put("/deleteNotification",(req,res)=>{
        const idnotification = req.body.idnotification
         
       
        
         db.query("DELETE FROM notification WHERE idnotification = ? ",
         [ idnotification],
         (err,result)=>{
             if(err){
                 console.log(err);
             }else{
                
                 console.log(result)
                 res.send(result);
             }
         })
     })

app.post("/NewCustomerNotification",(req,res)=>{
    const manager_id = req.body.manager_id
    const employee_id = req.body.employee_id
    const date = req.body.date
    const customer = req.body.customer
    const title = `New customer ${customer} is added`
    if(manager_id!==employee_id){
        if(manager_id!=="NULL"){
          db.query("SELECT first_name FROM manager where idmanager=?",
          [manager_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var manager = result[0].first_name
  db.query("INSERT INTO notification (title,manager,time) VALUES (?,?,?)",
  [title,manager,date],
     (err,result)=>{
         if(err){
  console.log(err);
  res.send(err)
         }else{
         
  console.log(result)
  res.send(result)
         }
         })
      }
  }) 
      }
        else{
          db.query("SELECT first_name FROM employee where idemployee=?",
          [employee_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var employee = result[0].first_name
          db.query("INSERT INTO notification (title,employee,time) VALUES (?,?,?)",
          [title,employee,date],
              (err,result)=>{
                  if(err){
        console.log(err);
        res.send(err)
                  }else{
                  
        console.log(result)
        res.send(result)
                  }
                  })
              }
          })
        }
      }
  })

  app.post("/NewLeadNotification",(req,res)=>{
    const manager_id = req.body.manager_id
    const employee_id = req.body.employee_id
    const date = req.body.date
    const lead = req.body.lead
    const title = `New lead ${lead} is added`
    if(manager_id!==employee_id){
        if(manager_id!=="NULL"){
          db.query("SELECT first_name FROM manager where idmanager=?",
          [manager_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var manager = result[0].first_name
  db.query("INSERT INTO notification (title,manager,time) VALUES (?,?,?)",
  [title,manager,date],
     (err,result)=>{
         if(err){
  console.log(err);
  res.send(err)
         }else{
         
  console.log(result)
  res.send(result)
         }
         })
      }
  }) 
      }
        else{
          db.query("SELECT first_name FROM employee where idemployee=?",
          [employee_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var employee = result[0].first_name
          db.query("INSERT INTO notification (title,employee,time) VALUES (?,?,?)",
          [title,employee,date],
              (err,result)=>{
                  if(err){
        console.log(err);
        res.send(err)
                  }else{
                  
        console.log(result)
        res.send(result)
                  }
                  })
              }
          })
        }
      }
  })

  app.post("/DeletedLeadNotification",(req,res)=>{
    const manager_id = req.body.manager_id
    const employee_id = req.body.employee_id
    const lead =req.body.lead
    const date = req.body.date
    const title = `A lead ${lead} is deleted`
    if(manager_id!==employee_id){
        if(manager_id!=="NULL"){
          db.query("SELECT first_name FROM manager where idmanager=?",
          [manager_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var manager = result[0].first_name
  db.query("INSERT INTO notification (title,manager,time) VALUES (?,?,?)",
  [title,manager,date],
     (err,result)=>{
         if(err){
  console.log(err);
  res.send(err)
         }else{
         
  console.log(result)
  res.send(result)
         }
         })
      }
  }) 
      }
        else{
          db.query("SELECT first_name FROM employee where idemployee=?",
          [employee_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var employee = result[0].first_name
          db.query("INSERT INTO notification (title,employee,time) VALUES (?,?,?)",
          [title,employee,date],
              (err,result)=>{
                  if(err){
        console.log(err);
        res.send(err)
                  }else{
                  
        console.log(result)
        res.send(result)
                  }
                  })
              }
          })
        }
      }
  })

  app.post("/DeletedCustomerNotification",(req,res)=>{
    const manager_id = req.body.manager_id
    const employee_id = req.body.employee_id
    const date = req.body.date
    const customer = req.body.customer
    const title = `A customer ${customer} is deleted`
    if(manager_id!==employee_id){
        if(manager_id!=="NULL"){
          db.query("SELECT first_name FROM manager where idmanager=?",
          [manager_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var manager = result[0].first_name
  db.query("INSERT INTO notification (title,manager,time) VALUES (?,?,?)",
  [title,manager,date],
     (err,result)=>{
         if(err){
  console.log(err);
  res.send(err)
         }else{
         
  console.log(result)
  res.send(result)
         }
         })
      }
  }) 
      }
        else{
          db.query("SELECT first_name FROM employee where idemployee=?",
          [employee_id],
          (err,result)=>{
              if(err){
                  console.log(err);
                   
              }else{
             var employee = result[0].first_name
          db.query("INSERT INTO notification (title,employee,time) VALUES (?,?,?)",
          [title,employee,date],
              (err,result)=>{
                  if(err){
        console.log(err);
        res.send(err)
                  }else{
                  
        console.log(result)
        res.send(result)
                  }
                  })
              }
          })
        }
      }
  })
module.exports = app;