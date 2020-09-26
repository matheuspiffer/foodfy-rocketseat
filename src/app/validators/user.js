const User = require("../models/user");

module.exports = {
  async post(req, res, next) {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user.rows[0]);
    if (user.rows[0]) {
      return res.render("./admin/users/register", {
        user: req.body,
        error: "Email já cadastrado",
      });
    }
    next();
  },
};
