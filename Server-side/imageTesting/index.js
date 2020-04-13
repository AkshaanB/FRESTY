var express = require('express');
var fs = require('fs');
const bodyParser = require("body-parser");



// Initiate Mongo Server
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/images'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
var Schema = mongoose.Schema;
var schema = new Schema({
  imgPath: {type:String},
  img: { data: Buffer, contentType: String, name: String}
}); 

var A = mongoose.model('A', schema);
var a = new A;

const app = express();

// PORT
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.post("/upload",(req, res) => {

    //var imgPath ='C:/Users/Pravin/Desktop/School Grad/DVD1/IMG_3261.JPG';
    // var schema = new Schema({
    //   imgPath: {type:String},
    //   img: { data: Buffer, contentType: String, name: String}
    // }); 

     const {imgPath} = req.body;
    // var A = mongoose.model('A', schema);

   
     
        // store an img in binary in mongo     
        var count=0;
        a.img.data = fs.readFileSync(imgPath);
        a.img.contentType = 'image/png';
        a.img.name = 'image'+count;
        count++;
        a.save(function (err, a) {
          
          if (err) throw err;
    
          res.json({ message: "saved img to mongo" });
        });
        
  });

  

 

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});