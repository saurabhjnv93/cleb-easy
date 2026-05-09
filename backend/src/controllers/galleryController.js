import cloudinary from 'cloudinary';
import GalleryImage from '../models/GalleryImage.js';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = async (req, res, next) => {
  try {
    const { image, caption, city, theme } = req.body;
    const uploaded = await cloudinary.v2.uploader.upload(image, { folder: 'celebeasy' });
    const gallery = await GalleryImage.create({
      url: uploaded.secure_url,
      caption,
      city,
      theme
    });
    res.status(201).json({ gallery });
  } catch (error) {
    next(error);
  }
};

export const listImages = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.city) filters.city = req.query.city;
    if (req.query.theme) filters.theme = req.query.theme;
    const images = await GalleryImage.find(filters).sort({ createdAt: -1 });
    res.json({ images });
  } catch (error) {
    next(error);
  }
};
