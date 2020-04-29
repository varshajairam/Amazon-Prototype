const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const mongo = require('./models/mongo');


const app = express();
const port = process.env.PORT || 3001;
dotenv.config();

mongo.connectDB();
app.use(
  cors({
    origin: [process.env.CLIENT_ROOT],
    credentials: true,
  }),
);
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.bucketName,
    acl: 'public-read',
    key(req, file, cb) {
      const newFilename = `cmpe273/group-project/${Date.now()}${file.originalname}`;
      console.log(newFilename);
      cb(null, newFilename);
    },
  }),
});

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(upload.any());
app.use(express.static('public'));

app.use(require('./routes'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
