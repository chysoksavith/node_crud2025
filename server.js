const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config/db");
const { users } = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// route
users(app);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
