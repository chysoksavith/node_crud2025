const { body } = require("express-validator");
const {
  getAll,
  create,
  update,
  getById,
  deleteUser,
} = require("../controllers/userController");
const { validateCheck, validateUser } = require("../util/validate");

const users = (app) => {
  app.get("/api/users", getAll);
  app.get("/api/users/:id", getById);
  app.post("/api/users", validateUser, validateCheck, create);
  app.put("/api/users/:id", update);
  app.delete("/api/users/:id", deleteUser);
};
module.exports = {
  users,
};
