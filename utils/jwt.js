const jwt = require("jsonwebtoken");
// generates different jwts for admins and users
const signAdminToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET);
  return token;
};
const verifyAdminToken = (token) => {
  const admin = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  return admin;
};

const signUserToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_USER_SECRET);
  return token;
};
const verifyUserToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_USER_SECRET);
  return user;
};
module.exports = {
  signAdminToken,
  verifyAdminToken,
  signUserToken,
  verifyUserToken,
};
