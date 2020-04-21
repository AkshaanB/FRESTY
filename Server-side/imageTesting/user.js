const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("index");
   });

const port = 5001;

app.listen(port, () => {
  console.log("server started on " + port);
});

const crypto = require("crypto");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
app.use(bodyParser.json());

// DB
const mongoURI = "mongodb+srv://fresty_grading:20181234@fresty-quality-grading-gebmh.mongodb.net/images";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });

});

//Storage
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: "uploads"
          };
          resolve(fileInfo);
      });
    }
  });


  
  const upload = multer({
    storage
  });




app.post("/upload",upload.single("file"), (req, res) => {
    res.redirect("/")
    const {email} = req.body;
    console.log(email);
    console.log("saved")
  });


  // app.get("/image/:filename", (req, res) => {
  //   // console.log('id', req.params.id)
  //   const file = gfs
  //     .find({
  //       filename: req.params.filename
  //     })
  //     .toArray((err, files) => {
  //       if (!files || files.length === 0) {
  //         return res.status(404).json({
  //           err: "no files exist"
  //         });
  //       }
  //       gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  //     });
  // });

  

  app.get("/all", (req, res) => {
     gfs.find()
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        for(let val of files) {
          console.log(val.filename);
          gfs.openDownloadStreamByName(val.filename).pipe(res);
      }
        
      });
});