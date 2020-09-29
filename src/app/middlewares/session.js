const Chef = require("../models/chef");
function onlyUsers(req, res, next) {
  if (!req.session.userId) return res.redirect("/admin/login");
  next();
}

async function onlyAdmins(req, res, next) {
  if (!req.session.userAdmin){
    const results = await Chef.all();
    let chefs = results.rows.map((chef) => {
      return {
        ...chef,
        avatar: chef.avatar
          ? `${req.protocol}://${req.headers.host}${chef.avatar.replace(
              "public",
              ""
            )}`
          : "",
      };
    });

    return res.render("admin/chefs/index", { chefs, error:"Acesso não autorizado!" });
  }
  next();
}
function redirectToProfile(req, res, next){
  if (!req.session.userAdmin) return res.redirect("/admin/profile");
  next();
}

module.exports = {
  onlyUsers,
  onlyAdmins,
  redirectToProfile
};
