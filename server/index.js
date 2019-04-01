const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const passport = require("passport");
const fs = require("fs");

const importer = require('./csv/importer');

mongoose.connect('mongodb://127.0.0.1/documents', { useNewUrlParser: true,  useCreateIndex: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

const port  = process.env.PORT || 5000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

// API routes
require('./routes')(app);

app.use(passport.initialize());
require("./config/passport")(passport);


var server = app.listen(port, function(err){
  if(err) {
    console.log('Express error: ' + err);
  }
  console.log('Server started');
});

var dir = './csv/files';

fs.readdir(dir, function(err, items) {

  if(items){
    for (var i = 0; i < items.length; i++) {
        var year = (items[i]).match( /20\d{2}/g)[0];
        importer.importCSV(dir + '/' + items[i], new Date(year, 0, 1));
    }
  }
});


var cron = require('node-cron');

cron.schedule('30 08 * * 1-5', () => {
  importer.sendOldDocuments(100);
});


process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});
