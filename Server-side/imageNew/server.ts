import * as express from 'express';
import * as multer from 'multer'
import * as cors from 'cors'
import * as mongoose from 'mongoose'
 
// Generell properties
export let UPLOAD_PATH = 'uploads'
export let PORT = process.env.PORT || 8080;
//let PORT = 3200;
 
// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
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
    

    // Pass to next layer of middleware
    next();
});


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
