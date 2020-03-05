const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');

router
  .route('/')
  .get(homeController.getHomeConfig)
  .post(homeController.setHomeConfig)
  .delete(homeController.resetHomeConfig);

module.exports = router;
