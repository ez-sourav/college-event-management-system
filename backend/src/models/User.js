import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "STUDENT", "VOLUNTEER"],
      required: true,
    },
  },
  { timestamps: true },
);
const User = mongoose.model("User", userSchema);

export default User;
