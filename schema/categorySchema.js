const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string().min(5).max(25)


const createCategorySchema = Joi.object({
  name: name.required(),

})

const getCategorySchema = Joi.object({
  id: id.required()
})

const updateCategorySchema = Joi.object({
  name: name,

})


const deleteCategorySchema = Joi.object({
  id: id.required()
})

module.exports = { createCategorySchema, get, getCategorySchema, updateCategorySchema, deleteCategorySchema }
