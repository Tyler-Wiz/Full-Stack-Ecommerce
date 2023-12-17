const crypto = require("crypto");

function generateRandomToken(length) {
  const buffer = crypto.randomBytes(length);
  return buffer.toString("hex");
}

module.exports = generateRandomToken;
