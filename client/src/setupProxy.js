const proxy = require('http-proxy-middleware');
const port = process.env.PORT || 8080;

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: `http://localhost:${port}/`
    })
  );
};
