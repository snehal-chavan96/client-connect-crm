const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    service: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lead', leadSchema);
