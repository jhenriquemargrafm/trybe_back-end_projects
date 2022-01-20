const notValid = () => ({ message: 'Invalid entries. Try again.' });

const checkRecipeFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json(notValid());
  }
  next();
};

module.exports = {
  checkRecipeFields,
};