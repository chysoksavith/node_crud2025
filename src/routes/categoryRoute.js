const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
} = require("../controllers/categoryController");
const { validateCategory, validateCheck } = require("../util/validate");

const categories = (app) => {
  app.get("/api/categories", getCategories);
  app.get("/api/categories/:id", getCategoryById);
  app.post("/api/categories", validateCategory, validateCheck, createCategory);
  app.put(
    "/api/categories/:id",
    validateCategory,
    validateCheck,
    updateCategory
  );
  app.delete("/api/categories/:id", );
};
module.exports = categories;
