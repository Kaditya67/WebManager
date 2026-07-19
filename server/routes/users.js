const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const generateToken = (user) => {
  return jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '7d' });
};

router.post('/register', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: 'User already registered.' });

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    
    await user.save();
    res.status(201).json({ token: generateToken(user), user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const validPassword = await user.comparePassword(req.body.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

    res.json({ token: generateToken(user), user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
});

router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) { next(error); }
});

router.put('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) {
      // Check if email is being taken by someone else
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Email is already in use.' });
      }
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = req.body.password; // Mongoose pre-save hook handles hashing
    }

    await user.save();
    
    // Generate new token in case email/name changed (since they are in the JWT payload)
    res.json({ token: generateToken(user), user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
});

module.exports = router;
