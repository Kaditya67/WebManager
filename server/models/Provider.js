const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  url: { type: String },
  notes: { type: String },
  customFields: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Provider', providerSchema);
