const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    token: { type: String, default: "" },
    email: { type: String, default: "" }
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Token', schema);