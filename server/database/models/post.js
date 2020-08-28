const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    user: {
      required: true,
      type: String
  },
    title: {
      required: true,
      type: String
  },
    content: {
      required: true,
      type: String
  },
    img:
    {
        required: true,
        type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  const Post = new mongoose.model("Post", postSchema);

  module.exports = {Post, postSchema};
