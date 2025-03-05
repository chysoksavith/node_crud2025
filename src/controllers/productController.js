const logError = require("../util/logError");
const db = require("../config/db");
const { generateSlug } = require("../util/helper");
const fs = require("fs");
const path = require("path");

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

const getProductById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";
  const [product] = await db.query(sql, [id]);
  if (product.length > 0) {
    res.json({
      product: product,
    });
  } else {
    res.json({
      message: "ID not found",
    });
  }
};

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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, is_active, stock, category_id, brand_id } =
    req.body;

  // Convert is_active to boolean (1 or 0)
  const isActive = is_active === "true" || is_active === true ? 1 : 0;

  const slug = generateSlug(name);
  const image = req.file ? req.file.filename : null;

  try {
    // Get the existing product details to check for old image
    const [product] = await db.query(
      "SELECT image FROM products WHERE id = ?",
      [id]
    );

    if (product.length > 0) {
      const oldImage = product[0].image;

      // If a new image is uploaded, delete the old image
      if (image && oldImage) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "uploads",
          "products",
          oldImage
        );

        // Check if old image exists and delete it
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update product details
      const sql = `
        UPDATE products
        SET name = ?, slug = ?, price = ?, description = ?, is_active = ?, image = ?, stock = ?, category_id = ?, brand_id = ?
        WHERE id = ?
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
        id,
      ];

      const [result] = await db.query(sql, params);

      if (result.affectedRows > 0) {
        res.status(200).json({
          message: "Product updated successfully",
          productId: id,
        });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    logError("product.update", error.message || error, res);
  }
};

const destroyProduct = async (req, res) => {
  const { id } = req.params; // Get the product ID from request parameters

  try {
    // 1. Retrieve product details (specifically the image)
    const [product] = await db.query(
      "SELECT image FROM products WHERE id = ?",
      [id]
    );

    if (product.length === 0) {
      // Product not found
      return res.status(404).json({ message: "Product not found" });
    }

    const oldImage = product[0].image;

    // 2. Delete image if it exists
    if (oldImage) {
      const oldImagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "products",
        oldImage
      );

      // Check if the image file exists and delete it
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Synchronously delete the file
      }
    }

    // 3. Delete the product from the database
    const sql = "DELETE FROM products WHERE id = ?";
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows > 0) {
      // Product deleted successfully
      res
        .status(200)
        .json({ message: "Product and image deleted successfully" });
    } else {
      // Product was not found in the database
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  createProduct,
  updateProduct,
  destroyProduct,
};
