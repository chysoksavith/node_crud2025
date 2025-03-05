const {
  getCategories,
  createCategory,
} = require("../controllers/categoryController");
const { validateCategory, validateCheck } = require("../util/validate");

const categories = (app) => {
  app.get("/api/categories", getCategories);
  app.post("/api/categories", validateCategory, validateCheck, createCategory);
};
module.exports = categories;
