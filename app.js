require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const configExpress = require("./config/express");
const routes = require("./routes/routes");

const app = express();

connectDB();
configExpress(app);

routes(app);

module.exports = { app };
