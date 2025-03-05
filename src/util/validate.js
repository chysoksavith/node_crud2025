const { validationResult, body } = require("express-validator");

const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("age").isInt({ min: 1 }).withMessage("Age must be a positive number"),
];
const validateBrand = [body("name").notEmpty().withMessage("Name is required")];
const validateCategory = [
  body("name").notEmpty().withMessage("Name is required"),
];

// validate check
const validateCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    errors: errors.array(),
  });
};

module.exports = {
  validateUser,
  validateBrand,
  validateCategory,
  validateCheck,
};
