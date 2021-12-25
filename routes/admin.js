const express = require('express');
const router = express.Router()
const adminController = require("../controllers/admin")

router.post("/user/register", adminController.registerUser);
router.get("/users", adminController.getUsers);
router.delete("/user/delete/:user_id", adminController.deleteUser);
router.patch("/user/disable/:user_id", adminController.disableUser);
router.patch("/transactions/update/:transaction_id", adminController.reverseTransaction);

// router.post("/register", async (req, res) => {
//     const data = req.body;
//     console.log("Raw", data);
//     try {
//       const { password: plainPassWord } = data;
//       data.password = await bcrypt.hash(plainPassWord, 10);
//       if (plainPassWord.length < 5) {
//         return res.json({
//           status: "error",
//           error: "Password should be atleast 8 Characters",
//         });
//       }
  
//       const user = await new User({
//         email: data.email,
//         username: data.username,
//         password: data.password,
//       }).save();
  
//       const token = jwt.sign({ user_id: user._id }, JWT_SECRET);
  
//       res.status(200).send({
//         message: "Account created successfully",
//         data: {
//           token,
//           user_id: user._id,
//           username: user.username,
//           email: user.email,
//           accountNumber: user.accountNumber,
//         },
//       });
//     } catch (error) {
//       if (error.code === 11000) {
//         return res.json({
//           status: "error",
//           error: "Username or Email Already exists",
//         });
//       }
//       res.status(400).send({
//         message: "Account could not be created",
//         error: error,
//       });
//     }
//   });



module.exports = router;