exports.setSession = (user) => {
  const fields = ['name', 'email', 'birthDate', 'sex', 'photoFileName', 'salt'];
  const session = {};
  fields.forEach((key) => {session[key] = user[key]});
  return session;
};