import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

let isConnected = false

export const connectToMongo = async () => {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    isConnected = true
  } catch (error) {
    console.log("MongoDB connection error:", error)
  }
}
