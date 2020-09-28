function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect("/admin/login");
  next();
}

function onlyAdmins(req, res, next) {
  if (!req.session.userAdmin) return res.redirect("/admin/profile");
  next();
}

module.exports = {
  onlyUsers,
  onlyAdmins,
};
