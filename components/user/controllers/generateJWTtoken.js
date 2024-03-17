const jwt = require("jsonwebtoken");

function generateJWTKey(parameters) {
  var newParameters = JSON.parse(parameters);

  return jwt.sign(newParameters, process.env.JWT_KEY, {
    expiresIn: "11h",
  });
}
