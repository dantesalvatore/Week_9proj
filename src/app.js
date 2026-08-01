require("dotenv").config();

const express = require("express");
const app = express();
const port = 3004;
const cors = require("cors");

const logRequest = require("./middleware/logger");
const errorHandler = require("./middleware/errorhandler");
const articleRoutes = require("./routes/article.router");
const userRoutes = require("./routes/user.route");


app.use(logRequest);

app.use(errorHandler);

app.use(express.json());

app.use(cors("*"));

app.use(articleRoutes);

app.use(userRoutes);

module.exports = app;