const db = require("../config/db");
const logError = require("../util/logError");

const getAll = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json({
      users: users,
      count: users.length,
    });
  } catch (error) {
    logError("users.get", error.message || error, res);
  }
};
const getById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE id = ?";
  const [users] = await db.query(sql, [id]);
  if (users.length > 0) {
    res.json({
      user: users[0],
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
const create = async (req, res) => {
  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  const params = [req.body.name, req.body.email, req.body.age];
  const [result] = await db.query(sql, params);
  res.json({
    message: "User created successfully",
    userId: result.insertId,
  });
};
const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  const sql = "UPDATE users SET name = ?, email = ?, age= ? WHERE id = ?";
  const params = [name, email, age, id];
  try {
    const [result] = await db.query(sql, params);
    if (result.affectedRows > 0) {
      res.json({
        message: "User updated successfully",
        userId: id,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    logError("user.update", error.message || error, res);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  const [result] = await db.query(sql, [id]);
  if (result.affectedRows > 0) {
    res.json({
      message: "User deleted successfully",
      userId: id,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
module.exports = {
  getAll,
  create,
  update,
  getById,
  deleteUser,
};
