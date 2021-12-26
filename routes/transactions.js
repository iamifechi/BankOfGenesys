const express = require('express');
const router = require("express").Router()
const auth = require("../middlewares/auth")
//const status = require("../middlewares/status")
const TransactionController = require("./../controllers/transactions")


router.post("/deposit", auth(), TransactionController.deposit)


module.exports = router