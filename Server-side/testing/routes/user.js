const express = require("express");
const { check, validationResult} = require("express-validator/check");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../User");
const mongoose = require('mongoose'); 
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
var ok;

router.post(
    "/register",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),
        check("confirmpassword", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password,
            confirmpassword
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            const pass1 = Buffer.from(password);
            const confirmPass = Buffer.from(confirmpassword);

            console.log(pass1)
            console.log(confirmPass)
            console.log(pass1.equals(confirmPass))
            if (!(pass1.equals(confirmPass))) {
                return res.status(400).json({
                    msg: "password does not match"
                });
            }
            user = new User({
                username,
                email,
                password,
                confirmpassword
            });
            
            

            // mongoose.connect('mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts'); 
            // var db=mongoose.connection; 
            // db.on('error', console.log.bind(console, "connection error")); 
            // db.once('open', function(callback){ 
            // console.log("connection succeeded"); 
            // })
            // const salt = await bcrypt.genSalt(10);
            // user.password = await bcrypt.hash(password, salt);
 
            sender(email,username);
            
            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
              
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

module.exports = router;

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const pass1 = Buffer.from(password);
        const pass2 = Buffer.from(user.password);
        console.log(pass1.equals(pass2));
        console.log(password);
        console.log(user.password);
        if (!(pass1.equals(pass2)))
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        var tok;
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 10000
          },
          (err, token) => {
            if (err) throw err;
            // tok = token;
              
            //  res.setheader("x-token",token);
              var url = 'https://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/me/'+token;
              //var url = 'http://localhost:8080/me/'+token;
              res.redirect(url);

              // res.status(200).json({
              //   token
              // });
          }
        );

       

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );
  
  
  sender = function(email,name){
      
    var nodemailer = require('nodemailer');

    //var rand,mailOptions,host,link;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fresty.qualitygrading@gmail.com',
            pass: 'frestyGrading'
        }
    });

    

    var nameText = "Welcome Mr/Mrs."+name;
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
        
        
    }; 
          
    //return res.sendFile(__dirname+'/signup_success.html'); 
  