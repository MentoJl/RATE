import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: false },
  password: String,
  isAdmin: { type: Boolean, default: false, required: true },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User