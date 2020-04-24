import { UPLOAD_PATH, app, upload } from './server';
import { Image } from './image';
import { predictedImage} from './predictedImage';
import * as path from 'path';
import * as fs from 'fs';
import * as mongoose from 'mongoose';

 
// Upload a new image with description
app.post('/images', upload.single('image'), (req, res, next) => {
    // Create a new image model and fill the properties
    const {email} = req.body;
    let uri = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/'+email;
    mongoose.connect(uri, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    console.log(email);

    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.email = req.body.email;
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
});
 


app.get('/image', (req, res, next) => {
    const {email} = req.query;
    let uri = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/'+email;
    mongoose.connect(uri, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    console.log(email);


    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        
            var img = images[images.length-1];
            Image.findById(img._id, (err, image) => {
                // stream the image back by loading the file
                res.setHeader('Content-Type', 'image/jpeg');
                fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
            });
    })
    //let imgId = req.params.id;
});




//Predicted images
app.post('/predictedImages', upload.single('image'), (req, res, next) => {

    const {email} = req.body;
    let uri = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/'+email;
    mongoose.connect(uri, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    console.log(email);

    // Create a new image model and fill the properties
    let newImage = new predictedImage();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.results = req.body.results
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
});



app.get('/predictedImages', (req, res, next) => {
    const {email} = req.query;
    let uri = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/'+email;
    mongoose.connect(uri, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    console.log(email);

   // let imgId = req.params.id;
   predictedImage.find({}, '-__v').lean().exec((err, predictedimages) => {
           
    var img = predictedimages[predictedimages.length-1];
    predictedImage.findById(img._id, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
    });
});

