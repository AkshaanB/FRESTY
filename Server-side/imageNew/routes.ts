import { UPLOAD_PATH, app, upload } from './server';
import { Image } from './image';
import { predictedImage} from './predictedImage';
import * as path from 'path';
import * as fs from 'fs';
import jwt = require('jsonwebtoken');
import * as mongoose from 'mongoose'
import cookieParser = require('cookie-parser');
var FormData = require('form-data');
var Request = require("request");

var just;


// Upload a new image with description
app.post('/images', upload.single('image'), (req, res, next) => {
    // Create a new image model and fill the properties
    //const {email} = req.body;
    console.log(just);
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts';
    mongoose.connect(url, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    //console.log(email);

    let image = new Image();
    image.originalName = req.file.originalname;
    image.filename = req.file.filename;
    image.email = just;
    image.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ image });
    });
    res.redirect("https://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/image");
});
 


app.get('/image', (req, res, next) => {
    //const {email} = req.query;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts';
    mongoose.connect(url, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    //console.log(email);


    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        
            var img = images[images.length-1];
            Image.findById(img._id, (err, image) => {
                // stream the image back by loading the file
                //res.setHeader('Content-Type', 'image/jpeg');
                //fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
                var formData = {
                    name: 'image',
                    image: {
                        value: fs.createReadStream(path.join(UPLOAD_PATH, image.filename)),
                        options: {
                            filename: image.filename,
                            email:just,
                            contentType: 'image/jpeg'
                        }
                    }
                };
            
                Request.post({
                    "headers": {
                        "Content-Type": "multipart/form-data"
                    },
                    //"url":"https://imageupload-unexpected-otter-ow.cfapps.eu10.hana.ondemand.com/images",
                    "url":"http://localhost:8080/images",
                    "formData": formData
                }, (error, response, body) => {
                    if (error) {
                        return console.log("Error: ", error);
                    }
                    let result = JSON.parse(body)
                    //console.log(result);
                    //console.log(result.url);
                    res.send(result);
                });
            
            });
    });
    //let imgId = req.params.id;
});



app.get('/send', (req, res, next) => {
    //const {email} = req.query;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts';
    mongoose.connect(url, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    //console.log(email);


    predictedImage.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        
            var img = images[images.length-1];
            predictedImage.findById(img._id, (err, image) => {
                // stream the image back by loading the file
                res.setHeader('Content-Type', 'image/jpeg');
                fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
            });
    });
    //let imgId = req.params.id;
});





//Predicted images
app.post('/predictedImages', upload.single('image'), (req, res, next) => {

    //var token = req.params.token;
    //var email = req.cookies.cookieName;
    // let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/predictedPhotos/'+email;
    // mongoose.connect(url, (err) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log('Connected to MongoDb');
    //     }
    // });
    // console.log(email);

    // Create a new image model and fill the properties
    let Image = new predictedImage();
    Image.originalName = req.file.originalname;
    Image.filename = req.file.filename;
    Image.results = req.body.results;
    Image.email = just;
    Image.count = req.body.count;
    Image.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ Image });
    });
});





// Get all uploaded images
app.get('/predictedImage', (req, res, next) => {
    //var email = req.cookies.cookieName;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/accounts';
    mongoose.connect(url, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    console.log(just);
    

    // use lean() to get a plain JS object
    // remove the version key from the response
    predictedImage.find({}, '-__v').lean().exec((err, predictedimages) => {
        if (err) {
            res.sendStatus(400);
        }
 
        //console.log(just+" hello");
        var filter = [];
        // Manually set the correct URL to each image
        for (let i = 0; i < predictedimages.length; i++) {
            var img = predictedimages[i];
            //img.url = req.protocol + '://' + req.get('host') + '/predicted/' + img._id;
            console.log(img.email);
            const obj = Buffer.from(img.email);
            const obj2 = Buffer.from(just);
            //console.log(obj+" "+obj2);
            if(obj.equals(obj2)){
                img.url = req.protocol + '://' + req.get('host') + '/predicted/' + img._id;
                //console.log(req.protocol);
                filter.push(predictedimages[i]);
            }
        }
        console.log(filter);
        res.json(filter);
    });
});

app.get('/predicted/:id', (req, res, next) => {
    let imgId = req.params.id;
 
    predictedImage.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
});




app.use(cookieParser());
var User = require('./User');

app.get('/me/:token', function(req, res, next) {

  //var token = req.header('x-token');
  let token = req.params.token;
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    console.log(decoded)
    User.findById(decoded.user.id, 
    { password: 0,confirmpassword: 0 }, // projection
    function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");   


    just = user.email;
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



