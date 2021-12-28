const  express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET

router.post("/login", async (req, res) => {
    const data = req.body;
  
    try{
      const username = data.username.toLowerCase()
      const user = await User.findOne({username : username})
  
      if(!user) return res.status(400).send({ message: "Invalid username or password"})
      
      if (await bcrypt.compare(data.password, user.password)) {
        const token = jwt.sign(
          {
            id: user._id,
            username: username,
            isLoggedIn : true,
            role: user.role
          },
          JWT_SECRET
        );

        res.status(200).send({ 
          message:"Login successful", 
          status: "ok", 
          data: {
            token,
            user_id: user._id,
            username: username,
            email:user.email,
            accountNumber: user.accountNumber
          }
         });
      }
    }catch (error) {
      console.log(error)
      res.status(400).send({ message: "unable to signin", error: error})
    }
  
  });


module.exports = router;