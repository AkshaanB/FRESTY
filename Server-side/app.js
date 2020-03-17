

var express=require("express"); 
var server=require("./server");
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/gfg'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
 
 var app=express();
  
  
 app.use(bodyParser.json()); 
 app.use(express.static('public')); 
 app.use(bodyParser.urlencoded({ 
     extended: true
 })); 
  
 var getEmail;
 

app.post('/sign_up', function(req,res){ 
    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('customerDetails').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fresty.qualitygrading@gmail.com',
            pass: 'frestyGrading'
        }
    });

    var nameText = "Under the Name of Mr/Mrs."+name;
    var mailOptions = {
        from: 'fresty.qualitygrading@gmail.com',
        to: email,
        subject: 'Confirmation',
        text: "Account has been created succesfully! "+nameText
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
        console.log("Record inserted Successfully"); 
        
    }); 
          
    return res.sendFile(__dirname+'/signup_success.html'); 
}) 
  

  
  


app.get('/',function(req,res){ 
return res.sendFile(__dirname+'/index1.html'); 
}).listen(3000) 
  

  
console.log("server listening at port 3000"); 

