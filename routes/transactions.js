const express = require('express');
const router = require("express").Router()
const auth = require("../middlewares/auth")
const TransactionController = require("./../controllers/transactions")


router.post("/deposit", auth(), TransactionController.deposit);
router.post("/withdraw", auth(), TransactionController.withdraw);
router.post("/transfer", auth(), TransactionController.transfer);
//router.post("/transaction", auth(), TransactionController.viewTransactions);

module.exports = router