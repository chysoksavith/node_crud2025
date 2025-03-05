const moment = require("moment");
const fs = require("fs/promises");

const logError = async (controller, message_error, res) => {
  try {
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss");
    const path = "./logs/" + controller + ".txt";
    const logMessage = "[" + timestamp + "]" + message_error + "\n";
    await fs.appendFile(path, logMessage);
  } catch (error) {
    console.error("error", error);
  }
  res.status(500).send("Internal Server error!");
};

module.exports = logError; // Export the function directly (not as an object)
