const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const validateSite = site => {
  const schema = Joi.object().keys({
    image: Joi.string().required(),
    type: Joi.required()
  });
  return schema.validate(site);
};

const siteSchema = new mongoose.Schema({
  image: { type: String, required: true },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'site-type',
    required: true
  }
});

const Site = mongoose.model('site', siteSchema);
module.exports = { validateSite, Site };
