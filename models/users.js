const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const myModule = require('../myModule')
const generateRandomAccountNumber = myModule.generateRandomAccountNumber

const userSchema = new Schema({
    email:{ type: String, required: true, unique: true},
    username:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    transactionPin : { type: Number, defaut: 0000},
    accountBalance :{type: Number, default: 0},
    accountNumber :{type: Number, unique: true, default: generateRandomAccountNumber},
    isDisabled: {type: Boolean, default: false}
},
    { collection: 'users'},
    { timestamps: true}
)

module.exports = mongoose.model('Users', userSchema)