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