const {
  Testimonial,
  validateTestimonial
} = require('../models/testimonial.model');
const { handleJoiError, handleError } = require('../helpers/errorHandler');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    if (testimonials.length > 0) {
      res.status(200).json({
        testimonials
      });
    } else {
      res.status(404).json({
        message: 'No testimonials found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};
exports.addTestimonial = async (req, res) => {
  try {
    const { error } = validateTestimonial(req.body);
    if (error) {
      handleJoiError(error, res);
      return;
    }
    const { author, content, on_home_page } = req.body;
    const testimonial = await new Testimonial({
      author,
      content,
      on_home_page
    }).save();
    res.status(201).json({
      message: 'Testimonial added successfully',
      testimonial
    });
  } catch (error) {
    handleError(error, res);
  }
};

//params operations
exports.deleteTestimonialController = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const testimonial = await Testimonial.findByIdAndDelete(id);
      if (testimonial) {
        res.status(200).json({
          message: 'Testimonial Deleted Successfully',
          testimonial
        });
      } else {
        res.status(404).json({
          message: 'Testimonial not found'
        });
      }
    } else {
      res.status(400).json({
        message: 'Invalid Testimonial ID'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  Testimonial.update(
    {
      _id: id
    },
    {
      $set: updates
    },
    (err, success) => {
      if (err) {
        handleError(err, res);
        return;
      } else {
        res.status(200).json({
          message: 'Testimonial Updated Successfully'
        });
      }
    }
  );
};

//update
exports.addTestimonialToHome = async (req, res) => {
  try {
    const { _ids } = req.body;
    _ids.forEach(async _id => {
      await Testimonial.findByIdAndUpdate(_id, {
        $set: {
          on_home_page: true
        }
      });
    });
    res.status(200).json({
      message: 'Added to Home successfully'
    });
  } catch (error) {
    handleError(error, res);
  }
};
