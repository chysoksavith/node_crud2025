const {
  getAllBrand,
  createBrand,
  updateBrand,
  getBrandById,
  destroyBrand,
} = require("../controllers/brandController");
const { validateBrand, validateCheck } = require("../util/validate");

const brands = (app) => {
  app.get("/api/brands", getAllBrand);

  app.get("/api/brands/:id", getBrandById);
  app.post("/api/brands", validateBrand, validateCheck, createBrand);
  app.put("/api/brands/:id", validateBrand, validateCheck, updateBrand);
  app.delete("/api/brands/:id", destroyBrand);
};
module.exports = brands;
