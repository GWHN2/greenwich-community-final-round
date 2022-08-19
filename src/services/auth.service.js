const extractJwtFromRequest = (req) => {
  let jwt;
  if (req.headers && req.headers.authorization) {
    // console.log("From header");
    jwt = req.headers.authorization.slice('Bearer '.length);
  } else if (req.body && req.body.access_token) {
    // console.log("From body");
    jwt = req.body.access_token;
  }
  return jwt;
};

module.export = { extractJwtFromRequest };
