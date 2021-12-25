const mongoose = require('mongoose');
const Schema = mongoose.Schema
const User = require('./users');


const transactionSchema = new Schema({
    senderAcct: { type: Schema.Types.ObjectId, required: true, unique:true},
    receiverAcct:{ type: String, required: true, unique: true},
    amount:{ type: Number},
    currentBalance :{type: Number}
},

    {timestamps:true},
    { collection: 'transactions'}
)

module.exports = mongoose.model('transactions', transactionSchema)