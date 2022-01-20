const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'seuTokenSecret';

  if (!token) return res.status(401).json({ message: 'jwt malformed' });
  
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
}
};

const authToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  next();
};

module.exports = { 
  validateToken, 
  authToken,
};