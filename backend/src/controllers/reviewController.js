const reviewModel = require('../models/reviewModel');

const submitReview = async (req, res) => {
  const { productId, userId, rating, reviewText, tags, photoUrl } = req.body;
  if (!productId || !userId || (!rating && !reviewText)) {
    return res.status(400).json({ error: 'Product ID, User ID, and at least one of rating or review are required' });
  }
  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  if (photoUrl && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/.test(photoUrl)) {
    return res.status(400).json({ error: 'Invalid photo URL (must be a valid image URL)' });
  }
  try {
    const review = await reviewModel.addReview(productId, userId, rating, reviewText, tags, photoUrl);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    const data = await reviewModel.getProductReviews(productId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopTags = async (req, res) => {
  try {
    const tags = await reviewModel.getTopTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewsByTag = async (req, res) => {
  const { productId, tag } = req.params;
  try {
    const reviews = await reviewModel.getReviewsByTag(productId, tag);
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitReview, getReviews, getTopTags, getReviewsByTag };