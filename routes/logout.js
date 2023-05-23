const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);
    res.send(null);
  })
}

module.exports = logout;