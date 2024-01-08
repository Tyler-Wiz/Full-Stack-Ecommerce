const jwt = require("jsonwebtoken");

const genOAuthToken = (user) => {
  const secretKey = process.env.JWTSECRET_KEY;

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      provider: user.provider,
    },
    secretKey
  );

  return token;
};

module.exports = genOAuthToken;
