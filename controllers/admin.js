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
    try {
      const { password: plainPassWord } = data;
      data.password = await bcrypt.hash(plainPassWord, 10);
      if (plainPassWord.length < 5) {
        return res.status(400).send({error: "Password should be atleast 8 Characters"})
      }
      if(data.transactionPin){
        if(!(data.transactionPin.toString().length == 4) || !parseInt(data.transactionPin) ){
          return res.status(400).send({error: "Transaction Pin must be 4 numbers"})
        }
      }
      
  
      const user = await new Users({
        email: data.email,
        username: data.username.toLowerCase(),
        password: data.password,
        transactionPin: data.transactionPin,
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
        return res.status(400).send({error: "Username or Email Already exists"});
      }
      console.log(error)
      res.status(400).send({
        message: "Account could not be created",
        error
      });
    }
  };

admin.deleteUser = async (req, res) => {
  const {user_id} = req.params
  try {
    const user = await Users.findByIdAndDelete(user_id);
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
    const transactionId = await req.params.transaction_id;
    const transaction = await Transactions.findOne({_id: transactionId});
    const amount = transaction.amount;
    const senderId = transaction.senderId;
    const sender = await Users.findOne({_id : transaction.senderId});
    const senderBalance = sender.accountBalance;
    const receiver = await Users.findOne({accountNumber : transaction.receiver});
    const receiverBalance = sender.accountBalance;
  
    await Transactions.updateOne({_id: transactionId},{
      type: 'reversed'
    });

    if(!(transaction.type == "transfer")){
      return res.status(400).send({
        message:"This transaction is not a transfer or it might have been reversed already...",
        data:transaction
      })
    }

    const reversedTransaction = await new Transactions({
        senderId: receiver._id,
        receiver: sender.accountNumber,
        type: 'reversed',
        amount: amount
    }).save()


  if(reversedTransaction){
    const updatedReceiverBalance = receiverBalance - amount;
    const updatedSenderBalance = senderBalance + amount;
    
    await Users.updateOne({_id: senderId},{
        accountBalance: updatedSenderBalance
    })
    await Users.updateOne({_id: receiver._id},{
        accountBalance: updatedReceiverBalance
    })

}

  res.status(200).send({message: "transaction reversed", data:reversedTransaction});
  } catch (error) {
    console.log(error)
    res.status(400).send({error: error});
  }
};

module.exports = admin;