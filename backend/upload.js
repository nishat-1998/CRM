var express = require('express');
var app = express();
const moment = require('moment-timezone');
const fileUpload = require('express-fileupload');
app.use(fileUpload());



app.post('/invoice/uploadInvoice', (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    console.log(file)
    const fileName = moment()+file.name
    file.mv(`${__dirname}/public/${fileName}`, err => {
      if (err) {
        console.error(err);
        console.log(err)
        return res.status(500).send(err);
      }
     
      res.json( {filePath: `${fileName}` });
    });
  });

  app.get('/invoice/viewinvoice', function(req, res) {
    const file = req.query.filePath
   
    res.sendFile( __dirname + "/public/" + file );
});


module.exports = app;


