const users = require("../api/users");
const records = require("../api/records");
const localAuth = require("../auth/local");

function routes(app) {
  app.use("/api/users", users);
  app.use("/api/records", records);
  app.use("/auth/local/login", localAuth);
}

module.exports = routes;
