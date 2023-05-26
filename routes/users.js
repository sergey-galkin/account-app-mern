const User = require("../db/user").User;

const users = async (req, res) => {
  const email = req.session?.user?.email;

  let users;
  try {
    users = await User.find({email: {$ne: email}}, 'name birthDate photoFileName');
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
  
  res.send(users);
}

module.exports = users;