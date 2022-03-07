var express = require('express');
var app = express();
var db = require('../config/db');
const fs = require('fs')
var InvoiceFiles;
var QuoteFiles;
var PaymentFiles;
function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
app.get("/customer/getcustomerForAdmin",(req,res)=>
    {
        //admin page
        db.query("SELECT * FROM customer",
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                res.send(result);
            }
        })
            })
  app.post ("/customers",(req,res)=>
{
const name = req.body.name
const contact = req.body.contact    
const website = req.body.website
const mail = req.body.mail
const service = req.body.service
const agent = req.body.agent
const company = req.body.company
const employee_id = req.body.employee_id
const manager_id = req.body.manager_id
const date = req.body.date
const project_id = req.body.project
const country = req.body.country
if(manager_id===employee_id){
    db.query("INSERT INTO customer (idcustomer,name,company, contact, mail, website, service,agent,date,project,country) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [UUID(),name, company, contact, mail, website, service, agent,date,project_id,country],
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
else if(manager_id === "NULL"){
    db.query("SELECT first_name FROM employee where idemployee=?",
    [employee_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const employee = result;
    db.query("INSERT INTO customer (idcustomer,name,company, contact, mail, website, service,agent,date,employee_id,project,country) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [UUID(),name, company, contact, mail, website, service, agent,date,employee[0].first_name,project_id,country],
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
    [manager_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const manager = result;
    db.query("INSERT INTO customer (idcustomer,name,company, contact, mail, website, service,agent,date,manager_id,project,country) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [UUID(),name, company, contact, mail, website, service, agent,date,manager[0].first_name,project_id,country],
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

app.get("/customers/getcustomers",(req,res)=>
{
    const manager_id =req.query.manager_id
    const employee_id = req.query.employee_id
    if(manager_id === employee_id){
        console.log({message: "loading"})
    }
    else if(manager_id === 'NULL'){
        db.query("SELECT first_name FROM employee where idemployee = ?",
        [employee_id],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                console.log(result.data)
                employeeId=result.first_name
              const employee = result;
    db.query("SELECT * FROM customer where employee_id = ?",
    [employee[0].first_name],
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
}else{
    db.query("SELECT first_name FROM manager where idmanager = ?",
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
          db.query("call customerDataWRTManager(?)", //Stored procedure
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

app.put("/updatecustomer",(req,res)=>{
    const name = req.body.name
    const contact = req.body.contact    
    const website = req.body.website
    const mail = req.body.mail
    const service = req.body.service
    const project = req.body.project
    const company = req.body.company
    const idcustomer = req.body.idcustomer
    const country = req.body.country
    db.query("UPDATE customer SET name=?, company=?, contact=?, mail=?, website=?, service=?, project=?, country=? WHERE idcustomer=?",
    [name, company, contact, mail, website, service, project,country,idcustomer],
     (err,result)=>{
         if(err){
             console.log(err);
         }else{
            
             console.log(result)
             res.send(result);
         }
     })
    })
    app.put("/updatecustomerCount",(req,res)=>{
        const manager_id = req.body.manager_id
        const employee_id = req.body.employee_id
       if(manager_id !== employee_id){
           if(manager_id !== "NULL"){
            db.query("SELECT total_customers FROM manager where idmanager=?",
            [manager_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                     
                }else{
               var count = result[0].total_customers
               console.log(result[0].total_customers)
               count++;
               db.query("UPDATE manager SET total_customers=? WHERE idmanager=?",
               [count,manager_id],
                (err,result)=>{
                    if(err){
                        console.log(err);
                    }else{
                       
                        console.log(result)
                        res.send(result);
                    }
                })
            }
        })
           }
     
        else{
            db.query("SELECT total_customers FROM employee where idemployee=?",
            [employee_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                     
                }else{
               var count = result[0].total_customers
               console.log(result[0].total_customers)
               count++;
        db.query("UPDATE employee SET total_customers=? WHERE idemployee=?",
        [count,employee_id],
         (err,result)=>{
             if(err){
                 console.log(err);
             }else{
                
                 console.log(result)
                 res.send(result);
             }
         })
        }
    
    })
}
}
        })

        app.put("/deletecustomerCount",(req,res)=>{
            const idcustomer = req.body.idcustomer     
                db.query("SELECT manager_id,employee_id FROM customer where idcustomer=?",
                [idcustomer],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                        const manager_id = result[0].manager_id
                        const employee_id = result[0].employee_id
           if(manager_id !== employee_id){
               if(manager_id !== null){
                db.query("SELECT total_customers FROM manager where first_name=?",
                [manager_id],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                   var count = result[0].total_customers
                   console.log(result[0].total_customers)
                   count--;
                   db.query("UPDATE manager SET total_customers=? WHERE first_name=?",
                   [count,manager_id],
                    (err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                           
                            console.log(result)
                            res.send(result);
                        }
                    })
                }
            })
               }
            else{
                db.query("SELECT total_customers FROM employee where first_name=?",
                [employee_id],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                   var count = result[0].total_customers
                   console.log(result[0].total_customers)
                   count--;
            db.query("UPDATE employee SET total_customers=? WHERE first_name=?",
            [count,employee_id],
             (err,result)=>{
                 if(err){
                     console.log(err);
                 }else{
                    
                     console.log(result)
                     res.send(result);
                 }
             })
            }
        })
    }
}
}  
                })
            })


    app.put("/deletecustomer",(req,res)=>{
        const idcustomer = req.body.idcustomer
         db.query("DELETE FROM customer WHERE idcustomer = ? ",
         [ idcustomer],
         (err,result)=>{
             if(err){
                 console.log(err);
             }else{
                
                 console.log(result)
                 res.send(result);
             }
         })
     })


     app.post("/deleteinvoice",(req,res)=>{
        const idcustomer = req.body.idcustomer
        db.query("SELECT path FROM invoice WHERE customer_id = ? ",
        [idcustomer],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
               
                console.log(result)
                InvoiceFiles= result;      
        }
        }
        )
        db.query("SELECT path FROM qoute WHERE customer_id = ? ",
        [idcustomer],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
               
                console.log(result)
                QuoteFiles= result;      
        }
        }
        )
        db.query("SELECT path FROM payment WHERE customer_id = ? ",
        [idcustomer],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
               
                console.log(result)
                PaymentFiles= result;      
        }
        }
        )
        {InvoiceFiles.map((file) => (

            fs.unlink(`${__dirname}/public/${file.path}`, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file removed
            })
            ))}
            {QuoteFiles.map((file) => (

                fs.unlink(`${__dirname}/public/${file.path}`, (err) => {
                if (err) {
                    console.error(err)
                    return
                }

                //file removed
                })
                ))}
                {PaymentFiles.map((file) => (

                    fs.unlink(`${__dirname}/public/${file.path}`, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
    
                    //file removed
                    })
                    ))}
     })


module.exports = app;