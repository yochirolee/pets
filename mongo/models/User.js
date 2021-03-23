import mongoose from "mongoose";

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a username."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    maxlength: 80,
    unique: [true, "This email is already register"]
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
