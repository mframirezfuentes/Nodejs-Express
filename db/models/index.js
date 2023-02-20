const { User, userSchema } = require('./userModel')
const { Product, productSchema } = require('./productModel')
const { Customer, customerSchema } = require('./customerModel')
const {Category, categorySchema}= require('./categoryModel')


function setupModel(sequelize) {
  User.init(userSchema, User.config(sequelize))
  Product.init(productSchema, Product.config(sequelize))
  Customer.init(customerSchema, Customer.config(sequelize))
  Category.init(categorySchema, Category.config(sequelize))


  //iniciamos las asociaciones o relaciones
  Customer.associate(sequelize.models)
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)

}

module.exports = setupModel;
