const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['planning', 'in-progress', 'completed'],
      default: 'planning'
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', projectSchema);
