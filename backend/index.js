const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3001;
dotenv.config();

app.use(cors({
  origin: [process.env.CLIENT_ROOT],
  credentials: true,
}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(multer().any());
app.use(express.static('public'));

app.use(require('./routes'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
