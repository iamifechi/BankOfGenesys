const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Users = require('../models/users');
const Transactions = require('../models/transactions');
const JWT_SECRET = process.env.JWT_SECRET


const admin = {}

admin.getUsers = async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).send({ message: "Users retrieved", data: data });
  } catch (error) {
    res.status(404).send({ error: error, message: "could not retrieve users" });
  }
};

admin.registerUser = async (req, res) => {
    const data = req.body;
    console.log("Raw", data);
    try {
      const { password: plainPassWord } = data;
      data.password = await bcrypt.hash(plainPassWord, 10);
      if (plainPassWord.length < 5) {
        return res.json({
          status: "error",
          error: "Password should be atleast 8 Characters",
        });
      }
  
      const user = await new Users({
        email: data.email,
        username: data.username,
        password: data.password,
      }).save();
  
      const token = jwt.sign({ user_id: user._id }, JWT_SECRET, { expiresIn: 60 * 10 });
  
      res.status(200).send({
        message: "Account created successfully",
        data: {
          token,
          user_id: user._id,
          username: user.username,
          email: user.email,
          accountNumber: user.accountNumber,
        },
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.json({
          status: "error",
          error: "Username or Email Already exists",
        });
      }
      res.status(400).send({
        message: "Account could not be created",
        error: error,
      });
    }
  };

admin.deleteUser = async (req, res) => {
  const {user_id} = req.params
  console.log(user_id)
  try {
    const user = await Users.findByIdAndDelete(user_id);
    console.log(user)  
    if(!user) throw new Error('Could not find user'); 
  
    res.status(200).send({message: "User deleted"});
  } catch (error) {
    res.status(400).send({error: error});
  }
};

admin.disableUser = async (req, res) => {
  const {user_id} = req.params;
 
  try {
    const user = await Users.findByIdAndUpdate(user_id,{
      $set: {
        isDisabled: true
      }
    }, { new: true })
 
    if(!user) throw new Error('Could not find user'); 
    res.status(200).send({ message:"user disabled" , 
      data: {
        user_id: user._id,
        username: user.username,
        email: user.email,
        accountNumber: user.accountNumber,
        isDisabled : user.isDisabled
      }  
  });
  } catch (error) {
    console.log(error)
    res.status(400).send({error: error});
  }
};

admin.reverseTransaction = async (req, res) => {
  const data = req.body;
  try {
    res.status(200).send({message: "", data:{}});
  } catch (error) {
    console.log(error)
    res.status(400).send({error: error});
  }
};

module.exports = admin;