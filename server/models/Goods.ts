import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const GoodsSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  images: { type: [String], default: [] },
  title: String,
  domain: { type: ObjectId, ref: 'User' },
  tags: [String],
  category: { 
    type: String, 
    enum: ['Іжа', 'Одяг', 'Домашні', 'Спорт', 'Електроніка'], 
    required: true 
  },
  price: { type: Number, required: true },
  currency: String,
  verified: { type: Boolean, default: false, required: false },
  description: String,
})

export default mongoose.models.Goods || mongoose.model("goods", GoodsSchema)