const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    receiverAcct: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },
    currentBalance: { type: Number },
    type: { type: String, required: true },
  },
  { timestamps: true },
  { collection: "transactions" }
);

transactionSchema.virtual("sendTo", {
  ref: "users",
  localField: "receiver",
  foreignField: "_id",
});

module.exports = mongoose.model("transactions", transactionSchema);
