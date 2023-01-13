const express = require('express')
const ProductsServices = require('../services/productServices')
const validatorHandler = require('../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schema/productSchema')
//const UsersServices = require('../services/usersService')
//const CategoriesSercices = require('../services/categoriesService')

const router = express.Router();
//Instacia de las clases
const productService = new ProductsServices();
//const userService = new UsersServices();
//const categoriesServices = new CategoriesSercices()

router.get("/", async (req, res) => {
  const products = await productService.find();
  res.json(products)
})
router.get("/filter", (req, res) => {
  res.send('Yo soy un filter')
})

router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await productService.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }


  })

router.post("/",
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await productService.create(body)
    res.status(201).json({
      message: 'created',
      data: newProduct
    })
  })

router.patch("/:id",
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {

    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  })

router.delete("/:id", async (req, res) => {

  const { id } = req.params;
  const product = await productService.delete(id)

  res.json(product)
})

module.exports = router;
