import mongoose from "mongoose";

/* UserSchema will correspond to a collection in your MongoDB database. */
const PostSchema = new mongoose.Schema({
  body: {
    type: String,
    maxlength: [200, "Name cannot be more than 60 characters"],
  },
  username: {
    type: String,
    maxlength: 80,
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

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
