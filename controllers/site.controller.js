const { validateSite, Site } = require('../models/site.model');
const { handleError, handleJoiError } = require('../helpers/errorHandler');

exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find().populate({
      path: 'type',
      ref: 'site-type'
    });
    if (sites.length > 0) {
      res.status(200).json({
        sites
      });
    } else {
      res.status(404).json({
        message: 'No sites found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

exports.addSite = async (req, res) => {
  try {
    const { error } = validateSite(req.body);
    if (error) {
      handleJoiError(error, res);
      return;
    }
    let site = await new Site(req.body).save();
    site = await Site.findById(site._id).populate({
      path: 'type',
      ref: 'site-type'
    });
    res.status(201).json({
      site
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateSite = async (req, res) => {
  const { id } = req.params;
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  Site.update(
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
          message: 'Site Updated Successfully'
        });
      }
    }
  );
};

exports.deleteSite = async (req, res) => {
  try {
    const { id } = req.params;
    const site = await Site.findByIdAndDelete(id);
    if (site) {
      res.status(200).json({
        message: 'Site deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'Site not found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};
