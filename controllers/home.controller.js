const { validateHome, Home } = require('../models/home.model');
const { handleError, handleJoiError } = require('../helpers/errorHandler');
exports.getHomeConfig = async (req, res) => {
  try {
    const home = await Home.find().populate({
      path: 'testimonials',
      model: 'testimonial'
    });
    if (home.length > 0) {
      res.status(200).json({
        home
      });
    } else {
      res.status(404).json({
        message: 'No home config found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

exports.setHomeConfig = async (req, res) => {
  try {
    const { error } = validateHome(req.body);
    if (error) {
      handleJoiError(error, res);
      return;
    }
    await Home.deleteMany({});
    console.log('All Documents Deleted');
    const { slides, testimonials } = req.body;
    const home = await new Home({
      slides,
      testimonials
    }).save();
    res.status(201).json({
      home
    });
  } catch (error) {
    handleError(error, res);
  }
};
exports.resetHomeConfig = async (req, res) => {
  try {
    console.log('Delete');
  } catch (error) {
    handleError(error, res);
  }
};
