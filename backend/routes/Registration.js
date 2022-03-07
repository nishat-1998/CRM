var express = require('express');
var app = express();
var db = require('../config/db');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
function UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
app.post ("/register/manager",(req,res)=>
{
const first_name = req.body.first_name
const ssn = req.body.ssn
const mail = req.body.mail
const phonenumber = req.body.phonenumber
const role = req.body.role
const password = req.body.password
const company = req.body.company
const department = req.body.department
const country = req.body.country
bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query("INSERT INTO manager (idmanager,first_name,  company, ssid, phonenumber, mail, role, password,department, country ) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [UUID(),first_name, company, ssn, phonenumber, mail, role, hash,department,country],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          
            db.query("SELECT idmanager FROM manager where first_name=?",
    [first_name],
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

})
    
});



app.get("/getmanagername",(req,res)=>
{
    const idmanager = req.body.manager_id
    db.query("SELECT first_name FROM manager where idmanager=?",
    [idmanager],
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
app.get("/getemployeename",(req,res)=>
{
    const idemployee = req.body.employee_id
    db.query("SELECT first_name FROM employee where idemployee=?",
    [idemployee],
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
app.get("/register/getDepartment",(req,res)=>
{
    db.query("SELECT * FROM department",
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

app.get("/register/getProject",(req,res)=>
{
    db.query("SELECT * FROM project",
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

app.put("/register/updateDepartment",(req,res)=>
{
    const name = req.body.name
    const iddepartment = req.body.iddepartment
    db.query("UPDATE department SET name=? WHERE iddepartment=?",
    [name,iddepartment],
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

app.put("/register/updateProject",(req,res)=>
{
    const name = req.body.name
    const idproject = req.body.idproject
    db.query("UPDATE project SET name=? WHERE idproject=?",
    [name,idproject],
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

app.put("/register/deleteDepartment",(req,res)=>
{
    const iddepartment = req.body.iddepartment
    db.query("DELETE FROM department WHERE iddepartment=?",
    [iddepartment],
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

app.put("/register/deleteProject",(req,res)=>
{
    const idproject = req.body.idproject
    db.query("DELETE FROM project WHERE idproject=?",
    [idproject],
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

app.post("/register/Project",(req,res)=>
{
    const name = req.body.name
    db.query("INSERT INTO project (name) VALUES(?)",
    [name],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    
    
    )
}
)

app.post("/register/Department",(req,res)=>
{
    const name = req.body.name
    db.query("INSERT INTO department (name) VALUES(?)",
    [name],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
            console.log(result.data)
            res.send(result);
        }
    }
    
    
    )
}
)


app.post ("/register/employee",(req,res)=>
{
const first_name = req.body.first_name
const ssn = req.body.ssn
const mail = req.body.mail
const phonenumber = req.body.phonenumber
const role = req.body.role
const manager = req.body.manager
const password = req.body.password
const company = req.body.company
const department = req.body.department
const country = req.body.country
bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query("SELECT idmanager FROM manager WHERE first_name = ?",
    [manager],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            const idmanager = result;
    db.query("INSERT INTO employee (idemployee,first_name,  company, ssid, phonenumber, mail, manager_id, role, password,department,country) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
    [UUID(),first_name,company, ssn, phonenumber, mail,manager, role, hash,department,country],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
           
            db.query("SELECT idemployee FROM employee where first_name=?",
    [first_name],
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
    })
})
    
});

app.post ("/register/adminPasswordChange",(req,res)=>
{
const password = req.body.password

bcrypt.hash(password, saltRounds, (err, hash)=>{
    if(err)
    {
        console.log(err);
    }
    db.query(`UPDATE admin SET password=? WHERE idadmin="70e6414f-fc9f-418b-9c58-c9dbab4d3c17"`,
    [hash],
    (err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"err"})
        }else{
          res.send(result)
        }
       
    })

})
    
});



module.exports = app;