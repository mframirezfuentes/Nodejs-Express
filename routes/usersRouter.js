
const express = require('express');
const passport = require('passport')
const UserService = require('./../services/usersService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schema/usersSchema');


const router = express.Router();
const service = new UserService();


router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {

    try {
      const users = await service.find();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

router.post("/",
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body)
      res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  })

router.get("/:id",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await service.findOne(id)
      res.json(user)

    } catch (error) {
      next(error)
    }

  })

router.patch("/:id",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const userUpdate = await service.update(id, body)
      res.json(userUpdate)
    } catch (error) {
      next(error)
    }
  })

router.delete("/:id",
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.status(201).json({ id })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
