const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true }],
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orders', orderSchema);