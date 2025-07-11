const jwt = require('jsonwebtoken');

module.exports = function (role) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      if (role && verified.role !== role) return res.status(403).send('Forbidden');
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send('Invalid Token');
    }
  };
};
