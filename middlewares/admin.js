const { verifyToken } = require("../utils/jwt");

async function adminAuth(req, res, next) {
  try {
    const token = req.headers.auth;
    const user = verifyToken(token);
    req.admin = user;
    if (token && user) {
      next();
    } else {
      res.json({ msg: "unauthenticated access" });
    }
  } catch (error) {
    res.json({ error });
  }

  //   if (user) {}
}

module.exports = { adminAuth };
