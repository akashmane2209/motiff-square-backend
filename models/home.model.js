const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const validateHome = home => {
  const schema = Joi.object().keys({
    slides: Joi.array().required(),
    testimonials: Joi.array().required()
  });
  return schema.validate(home);
};

const homeSchema = new mongoose.Schema(
  {
    slides: { type: Array, required: true },
    testimonials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Testimonial',
        required: true
      }
    ],
    sites_meta: { type: Object, default: {} }
  },
  {
    timestamps: true
  }
);

const Home = mongoose.model('home', homeSchema);

module.exports = { validateHome, Home };
