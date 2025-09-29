const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  brand: String,
  images: [String],
  inventory: { stock: { type: Number, default: 0 } },
  rating: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);