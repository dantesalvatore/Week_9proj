require("dotenv").config();

const express = require("express");
const app = express();
const port = 3004;
const cors = require("cors");
const connectDB = require("./database/connectDB");
const logRequest = require("./middleware/logger");
const errorHandler = require("./middleware/errorhandler");
const articleRoutes = require("./routes/article.router");


app.use(logRequest);
app.use(errorHandler);
app.use(express.json());
app.use(cors("*"));
app.use(articleRoutes);



connectDB();



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
