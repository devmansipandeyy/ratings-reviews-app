const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/reviews', reviewController.submitReview);
router.get('/reviews/:productId', reviewController.getReviews);
router.get('/top-tags', reviewController.getTopTags);
router.get('/reviews/:productId/tag/:tag', reviewController.getReviewsByTag);

module.exports = router;