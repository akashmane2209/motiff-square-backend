const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const validateSiteType = siteType => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  });
  return schema.validate(siteType);
};

const siteTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const SiteType = mongoose.model('site-type', siteTypeSchema);
module.exports = { validateSiteType, SiteType };
