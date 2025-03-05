const logError = require("../util/logError");
const db = require("../config/db");
const { generateSlug } = require("../util/helper");

const getAllProduct = async (req, res) => {
  const sql = "SELECT * FROM products";
  try {
    const [products] = await db.query(sql);
    res.json({
      products: products,
    });
  } catch (error) {
    logError("product.getAll", error.message || error, res);
  }
};

const getProductById = async (req, res) => {};

const createProduct = async (req, res) => {
  const { name, price, description, is_active, stock, category_id, brand_id } =
    req.body;
  const isActive = is_active === "true" || is_active === true ? 1 : 0;
  const slug = generateSlug(name);
  const image = req.file ? req.file.filename : null;
  const sql = `
    INSERT INTO products (name, slug, price, description, is_active,  image, stock, category_id, brand_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    name,
    slug,
    price,
    description,
    isActive,
    image,
    stock,
    category_id,
    brand_id,
  ];
  try {
    const [result] = await db.query(sql, params);
    res.status(201).json({
      message: "Product created successfully",
      productId: result.insertId,
    });
  } catch (error) {
    logError("product.create", error.message || error, res);
  }
};
const updateProduct = async (req, res) => {};
const destroyProduct = async (req, res) => {};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
};
