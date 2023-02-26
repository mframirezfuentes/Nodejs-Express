const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')



class CategoriesService {
  constructor() {

  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }
  async find() {
    const categories = await models.Category.findAll()
    return categories;

  }
  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ["products"]
    });
    return category;

  }
  async update() {

  }
  async delete() {

  }

}

module.exports = CategoriesService;
