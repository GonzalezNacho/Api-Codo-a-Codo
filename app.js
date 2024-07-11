const express = require("express");
const cors = require("cors");
const middleware = require("./utils/middleware");
const keepaliveController = require("./controller/keepalive");
const usersRoutes = require("./routes/usersRoutes");
const loginController = require("./controller/login");

const app = express();

app.use(cors());
app.use(express.json());

app.use(middleware.consoleData);
app.use(middleware.processToken);

app.use("/keepalive", keepaliveController);
app.use("/users", usersRoutes);
app.use("/login", loginController);

app.use(middleware.unknownEndpoint);
module.exports = app;
