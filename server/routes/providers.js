const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');
const auth = require('../middleware/auth');

router.use(auth);

// Get all providers for user
router.get('/', async (req, res, next) => {
  try {
    const providers = await Provider.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(providers);
  } catch (error) { next(error); }
});

// Create new provider
router.post('/', async (req, res, next) => {
  try {
    const provider = new Provider({
      ...req.body,
      user: req.user._id
    });
    await provider.save();
    res.status(201).json(provider);
  } catch (error) { next(error); }
});

// Update provider
router.put('/:id', async (req, res, next) => {
  try {
    const provider = await Provider.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (error) { next(error); }
});

// Delete provider
router.delete('/:id', async (req, res, next) => {
  try {
    const provider = await Provider.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.status(204).end();
  } catch (error) { next(error); }
});

module.exports = router;
