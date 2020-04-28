import { UPLOAD_PATH, app, upload } from './server';
import { Image } from './image';
import { predictedImage} from './predictedImage';
import * as path from 'path';
import * as fs from 'fs';
import * as mongoose from 'mongoose';




 
// Upload a new image with description
app.post('/images', upload.single('image'), (req, res, next) => {
    // Create a new image model and fill the properties
    //const {email} = req.body;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/photos';
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
    image.email = req.body.email;
    image.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ image });
    });
});
 


app.get('/image', (req, res, next) => {
    //const {email} = req.query;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/photos';
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
                res.setHeader('Content-Type', 'image/jpeg');
                fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
            });
    })
    //let imgId = req.params.id;
});




//Predicted images
app.post('/predictedImages', upload.single('image'), (req, res, next) => {

    const {email} = req.body;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/predictedPhotos';
    mongoose.connect(url, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDb');
        }
    });
    console.log(email);

    // Create a new image model and fill the properties
    let Image = new predictedImage();
    Image.originalName = req.file.originalname;
    Image.filename = req.file.filename;
    Image.results = req.body.results;
    Image.count = req.body.count;
    Image.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ Image });
    });
});



// app.get('/predictedImage', (req, res, next) => {
//     const {email} = req.query;
//     let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/'+email;
//     mongoose.connect(url, (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('Connected to MongoDb');
//         }
//     });
//     console.log(email);

//    // let imgId = req.params.id;
//    predictedImage.find({}, '-__v').lean().exec((err, predictedimages) => {

//     console.log("hello")
//     console.log(predictedimages);

    
//     for (let i = 0; i < predictedimages.length; i++) {
//         var img = predictedimages[i];
//         predictedImage.findById(img._id, (err, image) => {
//             if (err) {
//                 res.sendStatus(400);
//             }
//             // stream the image back by loading the file
//             console.log(image.filename); 
//             res.setHeader('Content-Type', 'image/jpeg');   
//             fs.createReadStream(path.join(UPLOAD_PATH, image.filename)).pipe(res);
//         });
//     };

//     //var img = predictedimages[predictedimages.length-1];
    
//     });       
// });


// Get all uploaded images
app.get('/predictedImages', (req, res, next) => {
    const {email} = req.query;
    let url = 'mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/predictedPhotos';
    mongoose.connect(url, (err) => {
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
            img.url = req.protocol + '://' + req.get('host') + '/images/' + img._id;
            console.log(req.protocol);
        }
        res.json(predictedimages);
    })
});