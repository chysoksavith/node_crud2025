const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { users } = require("./src/routes/userRoute");
const brands = require("./src/routes/brandRoute");
const categories = require("./src/routes/categoryRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// route
users(app);
brands(app);
categories(app);


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
