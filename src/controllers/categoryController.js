const db = require("../config/db");
const logError = require("../util/logError");

const getCategories = async (req, res) => {
  const sql = "SELECT * FROM categories";
  try {
    const [categories] = await db.query(sql);
    // nested category
    const buildTree = (categories, parentId = null) => {
      return categories
        .filter((category) => category.parent_id === parentId)
        .map((category) => ({
          ...category,
          children: buildTree(categories, category.id),
        }));
    };
    const nestedCategories = buildTree(categories);
    res.status(200).json({
      categories: nestedCategories,
    });
  } catch (error) {
    logError("categories.get", error.message || error, res);
  }
};
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM categories WHERE id = ?";
  const [category] = await db.query(sql, [id]);
  if (category.length > 0) {
    res.json({
      category: category,
    });
  } else {
    res.json({
      message: "ID not found",
    });
  }
};
const createCategory = async (req, res) => {
  const { name, parent_id } = req.body;
  const params = [name, parent_id || null];
  const sql = "INSERT INTO categories (name,parent_id) VALUES (?,?)";
  try {
    const [result] = await db.query(sql, params);
    res.status(200).json({
      message: "Category created successfully",
      categoryId: result.insertId,
    });
  } catch (error) {
    logError("categories.create", error.message || error, res);
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, parent_id } = req.body;

  const sql = "UPDATE categories SET name = ?, parent_id = ? WHERE id = ?";
  const params = [name, parent_id || null, id];
  try {
    const [result] = await db.query(sql, params);
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Category updated successfully",
      });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    logError("categories.update", error.message || error, res);
  }
};
const destroyCategory = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE id = ?";
  const [result] = await db.query(sql, [id]);
  if (result.affectedRows > 0) {
    res.json({
      message: "Category deleted success",
    });
  } else {
    res.json({
      message: "ID not found",
    });
  }
};
module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  destroyCategory,
};
