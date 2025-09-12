const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["CREDIT", "DEBIT"], required: true },
    reason: { type: String,   },
    status: { type: String, enum: ["SUCCESS", "FAILED", "PENDING"], default: "PENDING" },
    orderId: { type: String, required: true },
    paymentGatewayId: { type: String }, // Cashfree payment reference
  },
  { timestamps: true }
);

module.exports = mongoose.model("WalletTransaction", walletTransactionSchema);
