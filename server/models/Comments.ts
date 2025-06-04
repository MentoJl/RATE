import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const CommentsSchema = new mongoose.Schema({
  _id: { type: ObjectId, auto: true },
  userId: { type: ObjectId, ref: 'User', required: true },
  productId: { type: ObjectId, ref: 'Goods', required: true },
  text: { type: String, default: '', required: false },
  rate: { type: Number, fefault: 5, required: false }
})

export default mongoose.models.Comments || mongoose.model("comments", CommentsSchema)