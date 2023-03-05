const express = require('express')
const OrderService = require('../services/orderService')
const validatorHandler = require('../middlewares/validatorHandler')
const { createOrderSchema, getOrderSchema } = require('../schema/orderSchema')

const router = express.Router();
//Instacia de las clases
const service = new OrderService();


router.get("/:id",
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  })

router.post("/",
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body)
    res.status(201).json({
      message: 'created',
      data: newOrder
    })
  })
module.exports = router;
