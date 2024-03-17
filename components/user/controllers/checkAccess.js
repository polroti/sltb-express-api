exports.checkUserAndAccess = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");

    const token = bearer[1];

    req.token = token;
  }

  let usertype = "";
  const token = req.token;
  if (token) {
    const json = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    Object.entries(json).map((entry) => {
      if (entry[0] == "id") {
        req.body.createdBy = entry[1].toString();
      }

      if (entry[0] == "usertype") {
        usertype = entry[1].toString();
      }
    });

    if (usertype && usertype == "ADMIN") {
      next();
    } else {
      res.status(409).json({
        error: "Access Denied",
        code: "ACCESS_DENIED",
      });
    }
  }
  //cannot find token
  else {
    res.status(409).json({
      error: "Cannot find auth token",
      code: "AUTH_TOKEN_NOT_FOUND",
    });
  }
};
