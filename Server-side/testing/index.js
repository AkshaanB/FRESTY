
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition
var cors = require("cors");


// Initiate Mongo Server
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 


const app = express();
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

// PORT
const PORT = process.env.PORT || 5000;


// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
const jwt = require("jsonwebtoken");
const User = require("./User");

/*app.get('/me', function(req, res, next) {

  var token = req.headers['x-access-token'];
  //let token = req.params.token;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    console.log(decoded.user.id);
    User.findById(decoded.user.id, 
    { password: 0 }, // projection
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
     res.status(200).send(user); //Comment this out!
     // next(user); // add this line
    });
  });
});
*/

app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});