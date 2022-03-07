var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./config/db');

console.log(database)
// Connect to our database
database.connect((err) => {
    if(err){
        console.log("Db unsuccessfull"+err)
        throw err;
    }

    else{
        console.log("Db successfull")
    }
});

// This is to allow our api for cross-origin resource sharing
app.use(cors());

// This is to allow our api for parsing json
app.use(express.json());

// This is to allow our api to receive data from a client app
app.use(express.urlencoded({
    extended: true
}));


app.use('/', [
    require('./routes/Registration'),
    require('./routes/login'),
    require('./routes/leads'),
    require('./routes/customer'),
    require('./routes/appointment'),
    require('./routes/status'),
    require('./routes/invoice'),
    require('./routes/Payment'),
    require('./routes/Qoute'),
    require('./upload'),
    require('./routes/manager'),
    require('./routes/employee'),
    require('./routes/notification'),
    require('./routes/profile'),
    require('./routes/dashboard'),
    
]);
 




app.listen(3001, ()=>{
    console.log('running at port 3001')
})