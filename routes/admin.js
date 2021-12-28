const express = require('express');
const router = express.Router()
const adminController = require("../controllers/admin")

router.post("/user/register", adminController.registerUser); //register users
router.get("/users", adminController.getUsers); // view all users in the database
router.delete("/user/delete/:user_id", adminController.deleteUser); //delete a user account
router.patch("/user/disable/:user_id", adminController.disableUser); //disable a user account
router.post("/transactions/reverse/:transaction_id", adminController.reverseTransaction); // reverse a transaction




module.exports = router;