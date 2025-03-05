const {
  getAllProduct,
  createProduct,
  updateProduct,
  getProductById,
  destroyProduct,
} = require("../controllers/productController");
const { upload } = require("../util/helper");

const products = (app) => {
  app.get("/api/products", getAllProduct);
  app.get("/api/products/:id", getProductById);
  app.post("/api/products", upload.single("image"), createProduct);
  app.put("/api/products/:id", upload.single("image"), updateProduct);
  app.delete("/api/products/:id", destroyProduct);
};
module.exports = products;
