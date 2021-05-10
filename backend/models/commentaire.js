'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.commentaire.belongsTo(models.User, {
        foreignkey: {
          allowNull: false
        }
    }),
      models.commentaire.belongsTo(models.post, {
          foreignkey: {
            allowNull: false
          }
      })
    }
  };
  commentaire.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'commentaire',
  });
  return commentaire;
};