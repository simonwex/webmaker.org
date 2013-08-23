module.exports = function(domains) {
  var realmResp;

  if (domains) {
    realmResp = {
      realm: domains.split(" ")
    };
  }

  return function(req, res, next) {
    if (!realmResp) {
      return res.send(404);
    }

    res.json(realmResp);
  };
};
