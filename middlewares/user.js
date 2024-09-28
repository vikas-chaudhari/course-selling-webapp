const { verifyUserToken } = require("../utils/jwt");

async function userAuth(req, res, next) {
  try {
    const token = req.headers.auth;
    const user = verifyUserToken(token);
    req.admin = user;
    if (token && user) {
      next();
    } else {
      res.json({ msg: "unauthenticated access" });
    }
  } catch (error) {
    res.json({ error });
  }
}

module.exports = { userAuth };
