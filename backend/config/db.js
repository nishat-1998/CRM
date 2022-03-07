const mysql = require('mysql');
require('dotenv').config();
console.log(process.env.DB_DATABASE)
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
});

module.exports = con;
// var mysql = require('mysql2');
// var Client = require('ssh2').Client;
// var ssh = new Client();

// var db = new Promise(function(resolve, reject){
// 	ssh.on('ready', function() {
// 	  ssh.forwardOut(
// 	    // source address, this can usually be any valid address
// 	    '127.0.0.1',
// 	    // source port, this can be any valid port number
// 	    12345,
// 	    // destination address (localhost here refers to the SSH server)
// 	    '161.97.79.224',
// 	    // destination port
// 	    3306,
// 	    function (err, stream) {
// 	      if (err) throw err; // SSH error: can also send error in promise ex. reject(err)
// 	      // use `sql` connection as usual
// 	      	connection = mysql.createConnection({
// 	          host     : '161.97.79.224',
// 	          user     : 'root',
// 	          password : 'maithri@123', 
// 	          database : 'crm',
// 	          stream: stream
// 	        });

// 	        // send connection back in variable depending on success or not
// 		connnection.connect(function(err){
// 			if (err) {
// 				resolve(connection);
// 			} else {
// 				reject(err);
// 			}
// 		});
// 	  });
// 	}).connect({
// 	  host: '161.97.79.224',
// 	  port: 22,
// 	  username: 'root',
// 	  password: 'UQ6oan4SR8X7s'
// 	});
// });

// module.exports = db;
