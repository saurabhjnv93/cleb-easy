import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
  city: String,
  theme: String,
  createdAt: { type: Date, default: Date.now }
});

const GalleryImage = mongoose.model('GalleryImage', gallerySchema);
export default GalleryImage;
