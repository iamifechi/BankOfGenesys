const mongoose = require('mongoose')
const modules = require('./myModule')
const generateRandomAccountNumber = modules.generateRandomAccountNumber

const userSchema = new mongoose.Schema({
    
    email:{ type: String, required: true, unique: true},
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    accountBalance :{type: Number, default: 0},
    accountNumber :{type: String, unique: true, default: generateRandomAccountNumber},
    isDisabled: {type: Boolean, default: false}
},
    { collection: 'users'}
)

module.exports = mongoose.model('Users', userSchema)



// //Adding a new user
// exports.createUser = async (data) => {
//     return await new Users(data).save();
// }

// // 
// //getting all users
// exports.getAllUsers = async () => {
//     return await Users.find();
// }

// // Deleting a user account
// exports.deleteUser = async (userId) => {
//     const user = await Users.findOneAndDelete({_id: userId});
//     if(!user) throw new Error('This user does not exist'); 

//     return user
// }

// //Disabling an account
// exports.disableUserAccount = async (userId, data) => {
//     const user = await Users.findByIdAndUpdate(
//             {_id: userId},
//             { $set: data}
//         );

//     if(!user) throw new Error('This user does not exist'); 

//    return user
// }

//module.exports = Users