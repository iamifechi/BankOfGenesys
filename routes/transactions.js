const express = require('express');
const router = require("express").Router();
const auth = require("../middlewares/auth");
const isDisabled = require("../middlewares/isDisabled")
const TransactionController = require("./../controllers/transactions")


router.post("/profile/deposit", auth(), isDisabled(), TransactionController.deposit);
router.post("/profile/withdraw", auth(), isDisabled(), TransactionController.withdraw);
router.post("/profile/transfer", auth(), isDisabled(), TransactionController.transfer);
router.get("/profile/history", auth(), isDisabled(), TransactionController.history);

module.exports = router