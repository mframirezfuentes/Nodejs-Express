const express = require('express');
const passport = require('passport')



const AuthService = require('../services/authService')
const service = new AuthService()
const router = express.Router();

router.post("/login",
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      res.status(201).json(service.singToken(user))
    } catch (error) {
      next(error)
    }
  }
)

router.post("/recovery",
  async (req, res, next) => {
    try {
      const { email } = req.body
      const response = await service.sendMail(email)
      res.status(201).json(response);
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
