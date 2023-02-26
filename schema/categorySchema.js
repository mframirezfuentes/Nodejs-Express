const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(5).max(25)
const image = Joi.string().uri()


const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const getCategorySchema = Joi.object({
  id: id.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image
});


const deleteCategorySchema = Joi.object({
  id: id.required()
});

module.exports = { createCategorySchema, getCategorySchema, updateCategorySchema, deleteCategorySchema }
