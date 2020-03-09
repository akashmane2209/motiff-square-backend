const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const validateBlog = blog => {
  const schema = Joi.object().keys({
    blog_title: Joi.string().required(),
    publish_date: Joi.date().required(),
    blog_desc: Joi.string().required(),
    blog_author: Joi.string().required(),
    blog_content: Joi.required(),
    blog_image: Joi.required()
  });
  return schema.validate(blog);
};

const blogSchema = new mongoose.Schema(
  {
    blog_title: { type: String, required: true },
    publish_date: { type: Date, required: true },
    blog_author: { type: String, required: true },
    blog_desc: { type: String, required: true },
    blog_content: { type: String, required: true },
    blog_image: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = { validateBlog, Blog };
