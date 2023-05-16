const express = require('express')
const passport = require('passport')
const ProductsServices = require('../services/productServices')
const validatorHandler = require('../middlewares/validatorHandler')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schema/productSchema')

const router = express.Router();
//Instacia de las clases
const productService = new ProductsServices();

router.get('/',

  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await productService.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);


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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productService.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  })

router.delete("/:id",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {

    const { id } = req.params;
    const product = await productService.delete(id)

    res.json(product)
  })

module.exports = router;
