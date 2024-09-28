const jwt = require("jsonwebtoken");
// generate different jwts for admins and users
const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET);
  return token;
};
const verifyToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  return user;
};
module.exports = {
  verifyToken,
  signToken,
};
