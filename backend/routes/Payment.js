var express = require('express');
var app = express();
var db = require('../config/db');



app.post('/payment/insertpayment', (req, res) => {
    
    const date = req.body.date   
    const time = req.body.time
    const managerId = req.body.managerId
    const customerId = req.body.customerId
    const employeeId = req.body.employeeId
    const description = req.body.description
    const mode = req.body.mode
    const amount = req.body.amount
    const path = req.body.path
    
          if(managerId === employeeId){
            db.query("INSERT INTO payment (date,time,mode,amount,customer_id,path,description) VALUES(?,?,?,?,?,?,?)",
            [date,time,mode,amount,customerId,path,description],
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
        db.query("INSERT INTO payment (date,time,mode,amount, customer_id, employee_id,path,description) VALUES(?,?,?,?,?,?,?,?)",
        [date,time,mode,amount,customerId,employee[0].first_name,path,description],
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
          db.query("INSERT INTO payment (date,time,mode,amount, customer_id, manager_id,path,description) VALUES(?,?,?,?,?,?,?,?)",
          [date,time,mode,amount,customerId,manager[0].first_name,mode,description],
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

  app.get("/payment/getPayment",(req,res)=>
    {
        const customer_id =req.query.customer_id
       
            db.query("SELECT * FROM payment where customer_id =?",
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
    app.put("/payment/upadetPaymentStatus",(req,res)=>
    {
        const customer_id =req.body.customerId
        const payment = req.body.paymentStatus
       
            db.query("UPDATE customer SET payment=? WHERE name =?",
            [payment,customer_id],
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