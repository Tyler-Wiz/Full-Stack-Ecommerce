const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWTSECRET_KEY;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
      last_login: user.last_login,
      isadmin: user.isadmin,
      username: user.username,
    },
    secretKey
  );

  return token;
};

module.exports = genAuthToken;
