const User = require("../db/user").User;
const { setSession } = require("../libs");

const setWarnings = (message) => ({
    email: message,
    password: message,
});

const authentication = async (req, res) => {
  const authData = req.body;
  
  let user;
  try {
    user = await User.findOne({email: authData.email});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  const status = user && (user.checkPassword(authData.password)) ? true : false;
  const warnings = setWarnings(status ? '' : 'Check data in this field');
  
  if (status) req.session.user = setSession(user);
  
  res.send({status, warnings});
}

module.exports = authentication;