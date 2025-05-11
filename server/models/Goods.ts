import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const GoodsSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  image: String,
  title: String,
  tags: [String],
  category: String,
  price: Number,
  pricetype: String,
})

export default mongoose.models.Goods || mongoose.model("goods", GoodsSchema)