const { Model, Sequelize, DataTypes } = require('sequelize')

const CATEGORY_TABLE = 'categories'

const categorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: {
    type: DataTypes.STRING(),
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
}

class Category extends Model {

  //donde se genera la asociación hacia otras tablas
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products ',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }

  }
}

module.exports = { Category, categorySchema, CATEGORY_TABLE }
