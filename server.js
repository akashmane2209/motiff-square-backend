const express = require('express');
const app = express();
const http = require('http').createServer(app);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const _ = require('lodash');
dotenv.config();
const config = require('./config.js');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var parser = multer({
  storage: cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'Images',
    filename: function(req, file, cb) {
      cb(undefined, file.originalname);
    }
  })
});

app.post('/upload-images', parser.array('image'), (req, res, next) => {
  let data = _.map(req.files, _.partialRight(_.pick, 'secure_url'));
  res.json({
    data
  });
});

app.get('/', async (req, res) => {
  res.send('<h1>Motiff Square Server </h1>');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const homeRouter = require('./routes/home.routes');
const testimonialRouter = require('./routes/testimonial.routes');
const blogRouter = require('./routes/blog.routes');
const siteTypesRouter = require('./routes/site-type.routes');
const siteRouter = require('./routes/site.routes');
app.use('/home', homeRouter);
app.use('/testimonials', testimonialRouter);
app.use('/blogs', blogRouter);
app.use('/site-types', siteTypesRouter);
app.use('/sites', siteRouter);
const PORT = process.env.PORT || 3001;
const MONGO_CONNECTION = config.get('db.host') + config.get('db.name');
const server = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    http.listen(PORT, () => {
      console.log('Server started on ', PORT);
    });
  } catch (error) {
    console.log('Error', error);
  }
};

server();
