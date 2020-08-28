const mongoose = require('mongoose')
let post = require('../models/post')

const challengeSchema = new mongoose.Schema({
    user: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    posts: [post.postSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  const Challenge = new mongoose.model("Challenge", challengeSchema);

  module.exports = {Challenge, challengeSchema};
