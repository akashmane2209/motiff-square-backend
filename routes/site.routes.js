const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.controller');

router
  .route('/')
  .get(siteController.getAllSites)
  .post(siteController.addSite);

router
  .route('/:id')
  .put(siteController.updateSite)
  .delete(siteController.deleteSite);

module.exports = router;
