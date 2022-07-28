const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });

const createUserJwt = (user) => {
  const payload = {
    email: user.email,
    isAdmin: user.isAdmin || false,
  };

  return generateToken(payload);
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return {};
  }
};

module.exports = {
  generateToken,
  createUserJwt,
  validateToken,
};
