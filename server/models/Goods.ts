import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const GoodsSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  image: String,
  title: String,
  userId: { type: ObjectId,  ref: 'User' },
  tags: [String],
  category: String,
  price: Number,
  currency: String,
  description: String,
})

export default mongoose.models.Goods || mongoose.model("goods", GoodsSchema)