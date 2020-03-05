const { validateSiteType, SiteType } = require('../models/site-type.model');
const { handleError, handleJoiError } = require('../helpers/errorHandler');

exports.getAllSiteTypes = async (req, res) => {
  try {
    const siteTypes = await SiteType.find();
    if (siteTypes.length > 0) {
      res.status(200).json({
        siteTypes
      });
    } else {
      res.status(404).json({
        message: 'No site-types found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};

exports.addSiteType = async (req, res) => {
  try {
    const { error } = validateSiteType(req.body);
    if (error) {
      handleJoiError(error, res);
      return;
    }
    const siteTypes = await new SiteType(req.body).save();
    res.status(201).json({
      siteTypes
    });
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateSiteType = async (req, res) => {
  const { id } = req.params;
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  SiteType.update(
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
          message: 'Site Type Updated Successfully'
        });
      }
    }
  );
};

exports.deleteSiteType = async (req, res) => {
  try {
    const { id } = req.params;
    const siteTypes = await SiteType.findByIdAndDelete(id);
    if (siteTypes) {
      res.status(200).json({
        message: 'Site Type deleted successfully'
      });
    } else {
      res.status(404).json({
        message: 'Site Type not found'
      });
    }
  } catch (error) {
    handleError(error, res);
  }
};
