const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");

mongoose.connect('mongodb://127.0.0.1/documents', { useNewUrlParser: true,  useCreateIndex: true })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

const port  = process.env.PORT || 5000;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
