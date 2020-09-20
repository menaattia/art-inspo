const mongoose = require('mongoose')
let photo = require('../models/photo')

const themeSchema = new mongoose.Schema({
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
    photos: [photo.photoSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  const Theme = new mongoose.model("Theme", themeSchema);

  module.exports = {Theme, themeSchema};