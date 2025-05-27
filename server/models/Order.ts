const mongoose = require('mongoose')
const { Schema, Types } = mongoose

const OrderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  goods: [
    {
      productId: {
        type: Types.ObjectId,
        ref: 'Goods',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  totalSum: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'processing', 'shipped', 'delivered', 'completed', 'canceled'],
    default: 'created'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Order || mongoose.model("order", OrderSchema)