const path = require('path');

module.exports = function(app) {
  app.get('/api/registration', require("./registration"));
  app.get('/api/identification', require("./identification"));
  app.post('/api/authentication', require("./authentication"));
  app.post('/api/logout', require("./logout"));
  app.get('/api/users', require("./users"));
  app.post('/api/updateuser', require("./updateUser"));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), "public/index.html"), function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}