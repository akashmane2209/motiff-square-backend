const { validateBlog, Blog } = require('../models/blog.model');
const { handleError, handleJoiError } = require('../helpers/errorHandler');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length > 0) {
      res.status(200).json({
        blogs
      });
    } else {
      res.status(404).json({
        message: 'No blogs found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

exports.addBlog = async (req, res) => {
  try {
    const { error } = validateBlog(req.body);
    if (error) {
      handleJoiError(error, res);
      return;
    }
    const blog = await new Blog(req.body).save();
    res.status(201).json({
      blog
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  Blog.update(
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
        console.log(success);
        res.status(200).json({
          message: 'Blog Updated Successfully'
        });
      }
    }
  );
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (blog) {
      res.status(200).json({
        message: 'Blog deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'Blog not found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};
