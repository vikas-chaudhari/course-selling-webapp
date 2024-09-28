const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 3);
  console.log(hashedPassword);
  return hashedPassword;
}
async function compare(plainPassword, hashedPassword) {
  const isMatched = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatched;
}

module.exports = {
  hashPassword,
  compare,
};
