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
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
});
 
// Get all uploaded images
app.get('/images', (req, res, next) => {
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

    // use lean() to get a plain JS object
    // remove the version key from the response
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
            console.log(req.protocol);
        }
        res.json(images);
    })
});

app.get('/images/:id', (req, res, next) => {
    let imgId = req.params.id;
 
    Image.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
    })
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

    // use lean() to get a plain JS object
    // remove the version key from the response
    predictedImage.find({}, '-__v').lean().exec((err, predictedimages) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < predictedimages.length; i++) {
            var img = predictedimages[i];
            img.url = req.protocol + '://' + req.get('host') + '/predictedImages/' + img._id;
            console.log(req.protocol);
        }
        res.json(predictedimages);
    })
});

app.get('/predictedImages/:id', (req, res, next) => {
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