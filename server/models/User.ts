import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: { type: String, default: "Користувач", required: false },
  email: { type: String, unique: true, required: false },
  password: String,
  role: { type: String, default: "User", required: true },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User