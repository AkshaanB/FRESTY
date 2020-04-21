
const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user"); //new addition


// Initiate Mongo Server
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 


const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});


/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});