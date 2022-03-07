
var express = require('express');
var app = express();
var db = require('../config/db');

var  managerId = "NULL";
var employeeId ="NULL";
function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



app.get("/leads/getleadsForAdmin",(req,res)=>
    {

        //admin page
        const status =req.query.status
        db.query("Call LeadsDataWRTStatusandAdmin(?)",
        [status],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                console.log(result[0])
                res.send(result[0]);
            }
        })
            })

           
  
  app.post ("/leads",(req,res)=>
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
const country = req.body.country
if(manager_id === employee_id){
    //Admin page
    db.query("INSERT INTO leads (idleads,name,company, contact, mail, website, service,agent,datetime, country ) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [UUID(),name, company, contact, mail, website, service, agent,date, country],
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
    //employee page
    db.query("SELECT first_name FROM employee where idemployee=?",
    [employee_id],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
           
            console.log(result)
      const employee = result;
    db.query("INSERT INTO leads (idleads,name,company, contact, mail, website, service,agent,employee_id,datetime, country) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [UUID(),name, company, contact, mail, website, service, agent,employee[0].first_name,date, country],
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
    }else{
        //manager page
        db.query("SELECT first_name FROM manager where idmanager=?",
        [manager_id],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send({message:"err"})
            }else{
              
               
                console.log(result)
          const manager = result;
          db.query("INSERT INTO leads (idleads,name,company, contact, mail, website, service,agent,manager_id,datetime,country ) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
          [UUID(),name, company, contact, mail, website, service, agent,manager[0].first_name,date, country],
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

app.post ("/AddBulkleads",(req,res)=>
{
    const lead = req.body.leadData
    const date = req.body.date
    var data;
    //Adding bulk lead data for admin page
    if(managerId === employeeId){
        {lead.map((lead) => (
            db.query("INSERT INTO leads (idleads,name,company, contact, mail, website, service,agent,datetime,country) VALUES (?,?,?,?,?,?,?,?,?,?)",
            [UUID(),lead.name, lead.company, lead.contact, lead.mail, lead.website, lead.service, lead.agent,date,lead.country],
            (err,result)=>{
                if(err){
                    console.log(err);
                    data = err;
                }else{
                    console.log(result)
                    data = result;
                }
               
            })
            ))}
            res.send(data)  
    }
    else if(managerId === "NULL"){
        //Adding bulk lead data for employee page
        db.query("SELECT total_leads FROM employee where first_name=?",
        [employeeId],
        (err,result)=>{
            if(err){
                console.log(err);
                 
            }else{
           var count = result[0].total_leads
           console.log(result[0].total_leads)
    {lead.map((lead) => (
    db.query("INSERT INTO leads (idleads,name,company, contact, mail, website, service,agent,employee_id,datetime,country) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [UUID(),lead.name, lead.company, lead.contact, lead.mail, lead.website, lead.service, lead.agent,employeeId,date,lead.country],
    (err,result)=>{
        if(err){
            console.log(err);
            data = err;
        }else{
            console.log(result)
            data = result;
            count++;
            const title =`New lead ${lead.name} is added`
            db.query("UPDATE employee SET total_leads=? WHERE first_name=?",
            [count,employeeId],
             (err,result)=>{
                 if(err){
                     console.log(err);
                 }else{
                     console.log(result)
                 }
             })
             db.query("INSERT INTO notification (title,employee,time) VALUES (?,?,?)",
                [title,employeeId,date],
                    (err,result)=>{
                        if(err){
                console.log(err);
                        }else{
                console.log(result)
         }
         })
        }
       
    })
    ))}
}
        })
    res.send(data)
}else{
    //Adding bulk lead data for manager page
    db.query("SELECT total_leads FROM manager where first_name=?",
                [managerId],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                   var count = result[0].total_leads
                   console.log(result[0].total_leads)
                  
    {lead.map((lead) => (
        db.query("INSERT INTO leads (idleads,name,company, contact, mail, website, service,agent,manager_id,datetime,country) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        [UUID(),lead.name, lead.company, lead.contact, lead.mail, lead.website, lead.service, lead.agent,managerId,date,lead.country],
        (err,result)=>{
            if(err){
                console.log(err);
                data = err;
            }else{
                count++;
                const title =`New lead ${lead.name} is added`
                console.log(result)
                data = result;
                db.query("UPDATE manager SET total_leads=? WHERE first_name=?",
                   [count,managerId],
                    (err,result)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log(result)
                        }
                    })
                    db.query("INSERT INTO notification (title,manager,time) VALUES (?,?,?)",
                    [title,managerId,date],
                        (err,result)=>{
                            if(err){
                    console.log(err);
                            }else{
                    console.log(result)
             }
             })
            }
           
        })
   
        ))}
    }
})
        res.send(data)
}
})

   

app.get("/leads/getleadsWRTstatus",(req,res)=>
    {
        const manager_id =req.query.manager_id
        const employee_id = req.query.employee_id
        const status = req.query.status
       if(manager_id === employee_id){
           console.log("loading")
           res.send({message:"loading"})
       }
     else if(manager_id === 'NULL'){
            //Employee page
            db.query("SELECT first_name FROM employee where idemployee =?",
            [employee_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send(err)
                }else{
                    console.log(result.data)
                    employeeId = result[0].first_name;
                    managerId = "NULL";
                  const employee = result;
        db.query("SELECT * FROM leads where employee_id =? AND status=?",
        [employee[0].first_name,status],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                res.send(result);
            }
        })
    }
            })
    }else{
        //manage page
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
              db.query("call LeadsDataWRTStatusandManager(?,?)",
            [manager[0].first_name,status],
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


    app.get("/leads/getleads",(req,res)=>
    {
        const manager_id =req.query.manager_id
        const employee_id = req.query.employee_id
       if(manager_id === employee_id){
           console.log("loading")
       }
       else if(manager_id === 'NULL'){
            //Employee page
            db.query("SELECT first_name FROM employee where idemployee =?",
            [employee_id],
            (err,result)=>{
                if(err){
                    console.log(err);
                    res.send(err)
                }else{
                    console.log(result.data)
                    employeeId = result[0].first_name;
                    managerId = "NULL";
                  const employee = result;
        db.query("SELECT * FROM leads where employee_id =? ",
        [employee[0].first_name],
        (err,result)=>{
            if(err){
                console.log(err);
                res.send(err)
            }else{
                res.send(result);
            }
        })
    }
            })
    }else{
        //manage page
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
                  db.query("call dataWRTmanager(?)",
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

    app.put("/updatelead",(req,res)=>{
        const name = req.body.name
        const contact = req.body.contact    
        const website = req.body.website
        const mail = req.body.mail
        const service = req.body.service
        const agent = req.body.agent
        const company = req.body.company
        const country = req.body.country
        const idleads = req.body.idleads
        
        db.query("UPDATE leads SET name=?, company=?, contact=?, mail=?, website=?, service=?, agent=?, country=? WHERE idleads=?",
        [name, company, contact, mail, website, service, agent,country,idleads],
         (err,result)=>{
             if(err){
                 console.log(err);
             }else{
                
                 console.log(result)
                 res.send(result);
             }
         })
        })
    

        app.put("/updateleadCount",(req,res)=>{
            const manager_id = req.body.manager_id
            const employee_id = req.body.employee_id
           if(manager_id !== employee_id){
               if(manager_id !== "NULL"){
                db.query("SELECT total_leads FROM manager where idmanager=?",
                [manager_id],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                   var count = result[0].total_leads
                   console.log(result[0].total_leads)
                   count++;
                   db.query("UPDATE manager SET total_leads=? WHERE idmanager=?",
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
                db.query("SELECT total_leads FROM employee where idemployee=?",
                [employee_id],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                   var count = result[0].total_leads
                   console.log(result[0].total_leads)
                   count++;
            db.query("UPDATE employee SET total_leads=? WHERE idemployee=?",
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
    
      
            app.put("/deleteleadCount",(req,res)=>{
                const idleads = req.body.idleads
                
                db.query("SELECT manager_id,employee_id FROM leads where idleads=?",
                [idleads],
                (err,result)=>{
                    if(err){
                        console.log(err);
                         
                    }else{
                        const manager_id = result[0].manager_id
                        const employee_id = result[0].employee_id
                  
                   
               if(manager_id !== employee_id){
                   if(manager_id !== null){
                    db.query("SELECT total_leads FROM manager where first_name=?",
                    [manager_id],
                    (err,result)=>{
                        if(err){
                            console.log(err);
                             
                        }else{
                       var count = result[0].total_leads
                       console.log(result[0].total_leads)
                       count--;
                       db.query("UPDATE manager SET total_leads=? WHERE first_name=?",
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
                    db.query("SELECT total_leads FROM employee where first_name=?",
                    [employee_id],
                    (err,result)=>{
                        if(err){
                            console.log(err);
                             
                        }else{
                       var count = result[0].total_leads
                       console.log(result[0].total_leads)
                       count--;
                db.query("UPDATE employee SET total_leads=? WHERE first_name=?",
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


        app.put("/deletelead",(req,res)=>{
            const idleads = req.body.idleads  
             db.query("DELETE FROM leads WHERE idleads = ? ",
             [ idleads],
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



