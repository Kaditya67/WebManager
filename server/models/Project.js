const mongoose = require('mongoose');

const customFieldSchema = new mongoose.Schema({
  key: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true }
}, { _id: false });

const deploymentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  environment: { type: String, enum: ['production', 'staging', 'development', 'preview', 'other'], default: 'production' },
  provider: { type: String, trim: true },
  url: { type: String, trim: true },
  notes: { type: String, trim: true },
  customFields: [customFieldSchema],
}, { timestamps: true });

const componentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['frontend', 'backend', 'database', 'worker', 'mobile', 'other'], default: 'other' },
  techStack: { type: String, trim: true },
  databaseUsed: { type: String, trim: true },
  hostingProvider: { type: String, trim: true },
  internalPort: { type: Number },
  repositoryUrl: { type: String, trim: true },
  branch: { type: String, trim: true },
  notes: { type: String, trim: true },
  customFields: [customFieldSchema],
  deployments: [deploymentSchema],
});

module.exports = mongoose.model('Project', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  frameworks: { type: String, trim: true },
  primaryLanguage: { type: String, trim: true },
  repositoryUrl: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  customFields: [customFieldSchema],
  components: [componentSchema],
}, { timestamps: true }));
