const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./userModel');

// Define the items schema
const ItemSchema = new Schema({
  OrderItemId: { type: String, required: true },
  Sku: { type: String },
  productName: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Price: { type: Schema.Types.Decimal128, required: true },
  itemDiscount: { type: Schema.Types.Decimal128 }
}, { _id: false });

// Define the customer address schema
const AddressSchema = new Schema({
  name: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  contact: { type: String, required: true }
}, { _id: false });

// Define the main order schema
const OrderSchema = new Schema({
  orderType: { type: String, required: true, default: "retailorder" },
  orderNumber: { type: String, required: true },
  orderTotal: { type: Schema.Types.Decimal128, required: true },
  orderDate: { type: Date, default: () => new Date() },
  expDeliveryDate: { 
    type: Date, 
    default: function() {
      const today = new Date();
      return new Date(today.setDate(today.getDate() + 7));
    } 
  },
  shippingCost: { type: Schema.Types.Decimal128, required: true },
  discount: { type: Schema.Types.Decimal128 },
  walletDiscount: { type: Schema.Types.Decimal128 },
  promoCodeDiscount: { type: Schema.Types.Decimal128 },
  prepaidDiscount: { type: Schema.Types.Decimal128 },
  paymentMode: { type: Number, required: true },
  paymentGateway: { type: String, default: "Phonepe" },
  shippingMethod: { type: Number, required: true },
  packageWeight: { type: Schema.Types.Decimal128, required: true },
  packageHeight: { type: Schema.Types.Decimal128, required: true },
  packageWidth: { type: Schema.Types.Decimal128, required: true },
  packageLength: { type: Schema.Types.Decimal128, required: true },
  paymentTransactionId: { type: String, required: true },
  orderStatus: { type: Number, required: true, default: 0},
  items: [ItemSchema],
  customer: {
    billing: AddressSchema,
    shipping: AddressSchema
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User schema
});

// Create and export the model
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;