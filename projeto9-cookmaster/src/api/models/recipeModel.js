const { ObjectId } = require('bson');
const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const result = await connection()
  .then((db) => db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId }));
  return result;
};

const getAll = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find({}).toArray();
  return result;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
};

const editRecipe = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const db = await connection();
  const result = await db.collection('recipes')
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      );
  return result;
};

const addImageRecipe = async (id, imageLink) => {
  const db = await connection();
  const result = await db.collection('recipes')
      .updateOne(
        { _id: new ObjectId(id) }, 
        { $set: { image: imageLink } },
      );
  return result;
};

const deleteRecipe = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return result;
};

module.exports = {
  addRecipe,
  getAll,
  getById,
  editRecipe,
  deleteRecipe,
  addImageRecipe,
};