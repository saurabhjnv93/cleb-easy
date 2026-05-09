import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  startingPrice: Number,
  features: [String],
  theme: String,
  cityAvailability: [String],
  createdAt: { type: Date, default: Date.now }
});

const Package = mongoose.model('Package', packageSchema);
export default Package;
