import * as express from 'express';
import * as multer from 'multer'
import * as cors from 'cors'
import jwt = require('jsonwebtoken');
import * as mongoose from 'mongoose'
import cookieParser = require('cookie-parser')
import GridFsStorage = require('multer-gridfs-storage');
 
// Generell properties
export let UPLOAD_PATH = 'uploads'
export let PORT = process.env.PORT || 8080;
//let PORT = 3200;
 
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
  console.log("connection succeeded"); 
});



//Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});


export let upload = multer({ storage: storage })
 
// Initialise App
export const app = express();
app.use(cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token');
    
    //res.setHeader('Email', '');

    // Pass to next layer of middleware
    next();
});

/*app.use(cookieParser());
var just;
var User = require('./User');

app.get('/me/:token', function(req, res, next) {

  //var token = req.header('x-token');
  let token = req.params.token;
  just = req.params.token;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    console.log(decoded)
    User.findById(decoded.user.id, 
    { password: 0,confirmpassword: 0 }, // projection
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");   

     
     var cookie = req.cookies.cookieName;
      // if (cookie === undefined)
      // {
       // no: set a new cookie
      res.cookie('cookieName',user.email, { maxAge: 900000, secure: true });
      console.log('cookie created successfully');
      // } 
      // else
      // {
      //   // yes, cookie was already present 
      //   res.clearCookie("cookieName");
      //   res.cookie('cookieName',user.email, { maxAge: 900000 });
      // } 

      res.status(200).json({
           token
       });
     //res.status(200).send(user.email);
     next(); // <-

     //Comment this out!
      // add this line
    });
  });
});
*/




// add the middleware function
/*app.use(function (user, req, res, next) {
  res.setHeader("email",user.email);
  res.status(200).send(user.email);
  next();
    });*/

var routes = require('./routes');

 
// Setup Database
// let uri = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/imagesNew';
// mongoose.connect(uri, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Connected to MongoDb');
//     }
// });
 
// App startup
app.listen(PORT, function () {
    console.log('listening on port: ' + PORT);
});
