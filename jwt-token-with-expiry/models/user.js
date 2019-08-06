const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    email: { type: String, default: "" },
    password: { type: String},
    token: { type: Object, }


  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', schema);