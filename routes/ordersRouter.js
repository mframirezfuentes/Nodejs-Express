const express= require('express')
//const {validatorHandler}= require('../middlewares/validatorHandler')

const router= express.Router()

router.get("/", (req,res,next)=>{
  try {
    res.json([])
  } catch (error) {
    //next error
  }
})

module.exports = router;
