const mongoose = require('mongoose')
const resourceSchema = new mongoose.Schema({
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
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  const Resource = new mongoose.model("Resource", resourceSchema);

  module.exports = {Resource, resourceSchema};
