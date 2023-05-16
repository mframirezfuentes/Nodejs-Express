const express = require('express')
const passport = require('passport')
const CustomerService = require('../services/customersService')
const validatorHandler = require('../middlewares/validatorHandler')
const {
  getCustomerSchema,
  createCustomerSchema,
  updateSchema
} = require('../schema/customerSchema')

const router = express.Router()
const service = new CustomerService()

router.get("/",
  async (req, res, next) => {
    try {
      res.json(await service.find())
    } catch (error) {
      next(error)
    }
  })

router.post("/",
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {

    try {
      const body = req.body;
      res.status(201).json(await service.create(body))
    } catch (error) {
      next(error)
    }
  })

router.patch("/:id",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateSchema, 'params'),
  validatorHandler(updateSchema, 'body'),

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req.body
      res.status(201).json(await service.update(id, body))
    } catch (error) {
      next(error);
    }
  }
)

router.delete("/",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      res.json(200).json(await service.delete(id))
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
