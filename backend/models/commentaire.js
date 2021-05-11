'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       models.Commentaire.belongsTo(models.User, {
        foreignkey: {
          allowNull: false
        }
    }), 
       models.Commentaire.belongsTo(models.Post, {
          foreignkey: {
            allowNull: false
          }
      })  
    }
  };
  Commentaire.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Commentaire',
  });
  return Commentaire;
};