const identification = (req, res) => {
  const user = req.session.user ? {...req.session.user} : null;
  if (user) delete user.salt;
  res.send(user);
}

module.exports = identification;