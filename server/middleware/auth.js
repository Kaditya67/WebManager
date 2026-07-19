const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const bearer = token.split(' ')[1];
    const decoded = jwt.verify(bearer || token, process.env.JWT_SECRET || 'supersecretkey');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
