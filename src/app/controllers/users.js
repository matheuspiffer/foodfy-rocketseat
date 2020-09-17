module.exports = {
  create(req, res) {
    try {
      return res.render("./admin/users/register");
    } catch (err) {
      console.error(err);
    }
  },
  show(req, res) {
    try {
      return res.render("./admin/users/edit");
    } catch (err) {
      console.error(err);
    }
  },
};
