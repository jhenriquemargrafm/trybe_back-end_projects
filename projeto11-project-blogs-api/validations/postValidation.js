const validateTitle = (title) => {
  if (!title) return { err: { message: '"title" is required', code: 400 } };

  return null;
};

const validateContent = (content) => {
  if (!content) return { err: { message: '"content" is required', code: 400 } };

  return null;
};

const validateCategoryIds = (categoryIds) => {
  if (!categoryIds) return { err: { message: '"categoryIds" is required', code: 400 } };

  return null;
};

const validateFields = ({ title, content, categoryIds }) => {
  const titleValidation = validateTitle(title);
  if (titleValidation) return titleValidation;
  const contentValidation = validateContent(content);
  if (contentValidation) return contentValidation;
  const categoryIdsValidation = validateCategoryIds(categoryIds);
  if (categoryIdsValidation) return categoryIdsValidation;

  return null;
};

const postValidation = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const isPostOK = validateFields({ title, content, categoryIds });

  if (isPostOK) {
    return res.status(isPostOK.err.code).json({ message: isPostOK.err.message });
  }

  next();
};

module.exports = {
  postValidation,
}; 