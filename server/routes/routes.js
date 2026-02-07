const express=require("express");
const { handleIslamabadData, handleMurreData, handlePindiData, handleDubaiData, handleLahoreData, handleDetail } = require('../controllers/controllers')

const router=express.Router();


router.get("/isl",handleIslamabadData)
router.get("/murre",handleMurreData)
router.get("/pindi",handlePindiData)
router.get("/dub",handleDubaiData)
router.get("/lah",handleLahoreData)


router.get("/detail",handleDetail)




module.exports={router}