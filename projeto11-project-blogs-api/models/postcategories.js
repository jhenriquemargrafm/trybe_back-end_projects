module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {}, {
    tableName: 'PostsCategories',
    timestamps: false,
  });

  PostsCategories.associate = (models) => {
    // Associação de categoryId de PostCategories com o Id de Categories
    models.BlogPosts.belongsToMany(
      models.Categories,
      { as: 'categories', foreignKey: 'postId', otherKey: 'categoryId', through: PostsCategories },
    );
    // Associação de postId de PostCategories com o Id de BlogPosts
      models.Categories.belongsToMany(
      models.BlogPosts, 
      { as: 'blogposts', foreignKey: 'categoryId', otherKey: 'postId', through: PostsCategories },
    );
  };

  return PostsCategories;
};