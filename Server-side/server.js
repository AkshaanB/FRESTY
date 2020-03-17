// var mysql = require('mysql');
// var express = require('express');
// var session = require('express-session');
// var bodyParser = require('body-parser');
// var path = require('path');

// module.exports = {

//      sender: function() {
    // var app=express();

    // var email;
    // var bodyParser= require('body-parser');
    // app.use(bodyParser.urlencoded({extended:true}))
        
    // app.post('/sign_up',(req,res)=>{
    // email = req.body.email; // here you can get the value of from the textbox
    // });
        

//     var nodemailer = require('nodemailer');
//     var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'fresty.qualitygrading@gmail.com',
//             pass: 'frestyGrading'
//         }
//     });
//     var mailOptions = {
//         from: 'fresty.qualitygrading@gmail.com',
//         to: 'sivakumarlogith@gmail.com',
//         subject: 'Confirmation',
//         text: 'Account has been created succesfully!'
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         }
//         else {
//             console.log('Email sent: ' + info.response);
//         }
//     });

//     }
// };    
