const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial.controller');
router
  .route('/')
  .get(testimonialController.getAllTestimonials)
  .post(testimonialController.addTestimonial);

router.route('/add-to-home').put(testimonialController.addTestimonialToHome);

router
  .route('/update-home-testimonials')
  .put(testimonialController.updateHomePageTestimonials);
router
  .route('/:id')
  .put(testimonialController.updateTestimonial)
  .get(testimonialController.getTestimonialById)
  .delete(testimonialController.deleteTestimonialController);

module.exports = router;
