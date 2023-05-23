module.exports = function(app) {
  app.get('/api/registration', require("./registration"));
  app.get('/api/identification', require("./identification"));
  app.post('/api/authentication', require("./authentication"));
  app.post('/api/logout', require("./logout"));
  app.get('/api/users', require("./users"));
  // app.get('/api/user', require("./user").get);
  // app.post('/api/user', require("./user").post);
  app.post('/api/updateuser', require("./updateUser"));
}