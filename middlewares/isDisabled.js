const Users = require("./../models/users")

module.exports = () => {
  return async (req, res, next) => {
    try {
      const user = await Users.findById(req.USER_ID);
      const data = req.body;
      if(data.type == 'transfer'){
        const receiver = await Users.findOne({accountNumber: data.receiverAccount})
        if (!receiver) throw new Error("Receiver account not found")
        if (receiver.isDisabled == true) throw new Error("Receiver account has been disabled")
    }
      if (!user) throw new Error("User account not found")
      if (user.isDisabled) throw new Error(`The user account with ID:${user._id} has been disabled`)
      next()
    } catch (error) {
      next(error)
    }
  }
}