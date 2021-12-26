const express = require('express');
const router = express.Router()
const adminController = require("../controllers/admin")

router.post("/user/register", adminController.registerUser);
router.get("/users", adminController.getUsers);
router.delete("/user/delete/:user_id", adminController.deleteUser);
router.patch("/user/disable/:user_id", adminController.disableUser);
router.patch("/transactions/update/:transaction_id", adminController.reverseTransaction);




module.exports = router;