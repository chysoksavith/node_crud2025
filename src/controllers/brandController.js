const db = require("../config/db");
const generateSlug = require("../util/helper");
const logError = require("../util/logError");

const getAllBrand = async (req, res) => {
  const sql = "SELECT * FROM brands";
  try {
    const [brands] = await db.query(sql);
    res.json({
      brands: brands,
    });
  } catch (error) {
    logError("brands.get", error.message || error, res);
  }
};
const getBrandById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM brands WHERE id = ?";
  try {
    const [brand] = await db.query(sql, [id]);
    if (brand.length > 0) {
      res.json({
        brand: brand,
      });
    } else {
      res.status(404).json({ message: "Brand Id not found" });
    }
  } catch (error) {
    logError("brands.getOne", error.message || error, res);
  }
};
const createBrand = async (req, res) => {
  const { name } = req.body;
  const slug = generateSlug(name);
  const sql = "INSERT INTO brands (name,slug) VALUES (?,?)";
  try {
    const [result] = await db.query(sql, [name, slug]);
    res.status(200).json({
      message: "Brand created successfully",
      id: result.insertId,
    });
  } catch (error) {
    logError("brand.create", error.message || error, res);
  }
};
const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const slug = generateSlug(name);
  const sql = "UPDATE brands SET name = ?, slug = ? WHERE id = ?";
  const params = [name, slug, id];
  try {
    const [result] = await db.query(sql, params);
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Brand updated successfully",
        brandId: id,
      });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    logError("brand.update", error.message || error, res);
  }
};
const destroyBrand = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM brands WHERE id = ?";

  try {
    const [result] = await db.query(sql, [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: "Brand deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    logError("brand.delete", error.message || error, res);
  }
};

module.exports = {
  getAllBrand,
  createBrand,
  updateBrand,
  getBrandById,
  destroyBrand,
};
