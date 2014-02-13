var loginAPI = require("./loginapi");
var hood = require("hood");

module.exports.addCSP = function (options) {
  var policy = {
    headers: [
      "Content-Security-Policy-Report-Only"
    ],
    policy: {
      "connect-src": ["'self'"],
      "default-src": ["'none'"],
      "frame-src": ["'self'"],
      "font-src": ["'self'",
                   "https://mozorg.cdn.mozilla.net"],
      "img-src": ["*"],
      "script-src": ["'self'",
                     "https://mozorg.cdn.mozilla.net",
                     options.ssoUx],
      "style-src": ["'self'",
                    "'unsafe-inline'",
                    "https://mozorg.cdn.mozilla.net"]
    }
  };

  return hood.csp(policy);
};

module.exports.checkAdmin = function (req, res, next) {
  loginAPI.getUserByEmail(req.session.email, function (err, user) {
    if (err || !user || !user.isAdmin) {
      return next(new Error("Admin access only"));
    }
    req.isAdmin = true;
    return next();
  });
};

module.exports.removeXFrameOptions = function (req, res, next) {
  res.removeHeader("x-frame-options");
  next();
};
