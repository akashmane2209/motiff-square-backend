const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/blogs.controller');

router
  .route('/')
  .get(blogsController.getAllBlogs)
  .post(blogsController.addBlog);

router
  .route('/:id')
  .put(blogsController.updateBlog)
  .delete(blogsController.deleteBlog)
  .get(blogsController.getBlogById);

module.exports = router;
