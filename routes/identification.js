const identification = (req, res) => {
  const user = req.session.user;
  res.send(user);
}

module.exports = identification;