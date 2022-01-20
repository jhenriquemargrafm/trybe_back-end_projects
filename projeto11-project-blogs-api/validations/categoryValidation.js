const validateName = (name) => {
  if (!name) {
    return { err: {
      message: '"name" is required',
      code: 400,
    } };
  }

  return null;
};

const validateCategory = (name) => {
  const nameValidator = validateName(name);
  return nameValidator;
};

const categoryValidation = (req, res, next) => {
  const { name } = req.body;
  const isCategoryOK = validateCategory(name);

  if (isCategoryOK) {
    return res.status(isCategoryOK.err.code).json({ message: isCategoryOK.err.message });
  }

  next();
};

module.exports = {
  categoryValidation,
}; 