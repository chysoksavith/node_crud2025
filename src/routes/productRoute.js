const {
  getAllProduct,
  createProduct,
} = require("../controllers/productController");
const { upload } = require("../util/helper");

const products = (app) => {
  app.get("/api/products", getAllProduct);

  app.post("/api/products", upload.single("image"), createProduct);
};
module.exports = products;
