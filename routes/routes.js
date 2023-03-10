const users = require("../api/users");
const localAuth = require("../auth/local");

function routes(app) {
  app.use("/api/users", users);
  app.use("/auth/local/login", localAuth);
}

module.exports = routes;
