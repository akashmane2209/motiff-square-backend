const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const validateTestimonial = testimonial => {
  const schema = Joi.object().keys({
    author: Joi.string().required(),
    content: Joi.string().required(),
    image: Joi.string().required()
  });
  return schema.validate(testimonial);
};

const testimonialSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, require: true },
    image: { type: String, required: true },
    on_home_page: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const Testimonial = mongoose.model('testimonial', testimonialSchema);

module.exports = { validateTestimonial, Testimonial };
