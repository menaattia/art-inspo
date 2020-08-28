const mongoose = require('mongoose')
let resource = require('../models/resource')

const categorySchema = new mongoose.Schema({
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
    resources: [resource.resourceSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  const Category = new mongoose.model("Category", categorySchema);

  module.exports = {Category, categorySchema};
