require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/connectDB.js");

const port = process.env.PORT || 3004;



app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}`);
});
