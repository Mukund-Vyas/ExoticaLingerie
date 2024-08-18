const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transactionId: { type: String, required: true, unique: true },
    orderNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    paymentDetails: {
      merchantId: { type: String },
      merchantTransactionId: { type: String },
      merchantUserId: { type: String },
      name: { type: String },
      amount: { type: Number },
      redirectUrl: { type: String },
      redirectMode: { type: String },
      mobileNumber: { type: String },
      paymentInstrument: {
        type: {
          type: String,
        },
      },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  transactionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
  module.exports = mongoose.model('Transaction', transactionSchema);  
