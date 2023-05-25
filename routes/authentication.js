const User = require("../db/user").User;

const setAuthChecks = (status) => ({
  name: status,
  role: status,
});

const setSession = ({ name, birthDate, photoFileName }) => {
  if (name) return {
    name,
    birthDate,
    photoFileName
  }

  return null;
};

const authentication = async (req, res) => {
  const authData = req.body;
  
  let user = {};
  try {
    user = await User.findUnique({
      where: {name: authData.name},
      select: {name: true, password: true, role: true},
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  const status = user && (authData.password === user.password) ? true : false;
  const checks = setAuthChecks(status);
  
  if (status) req.session.user = setSession(user);
  
  res.send({status, checks});
}

module.exports = authentication;