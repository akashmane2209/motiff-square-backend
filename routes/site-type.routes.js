const express = require('express');
const router = express.Router();
const siteTypeController = require('../controllers/site-type.controller');

router
  .route('/')
  .get(siteTypeController.getAllSiteTypes)
  .post(siteTypeController.addSiteType);

router
  .route('/:id')
  .put(siteTypeController.updateSiteType)
  .delete(siteTypeController.deleteSiteType);

module.exports = router;
