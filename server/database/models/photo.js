const mongoose = require('mongoose')
const photoSchema = new mongoose.Schema({
    user: {
      required: true,
      type: String
  },
    title: {
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

  const Photo = new mongoose.model("Photo", photoSchema);

  module.exports = {Photo, photoSchema};