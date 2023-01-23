const { Model, Sequelize, DataTypes } = require('sequelize')

const PRODUCT_TABLE = 'products'

const productSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB('long'), // <- type for image ( database :postgresql )
        allowNull: true
  }
}

class Product extends Model {
  static associate() {

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps:false,
    }
  }

}


module.exports = { PRODUCT_TABLE, productSchema, Product }
