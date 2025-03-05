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
module.exports = {
  getCategories,
  createCategory,
};
