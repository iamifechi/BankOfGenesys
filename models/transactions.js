const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "users", required: true},
    sender:{ type: Object, required: true, default:{}},
    receiver: {type: Number, required: true, default: 0},
    amount: {type: Number,required: true},
    type: {type: String,required: true},
  },
    { collection: 'transactions'},
    { timestamps: true}
);


module.exports = mongoose.model("transaction", transactionSchema);
