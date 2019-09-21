const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.json('You must be logged in to do that');
};

module.exports = isAuthenticated;
