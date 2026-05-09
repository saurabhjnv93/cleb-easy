import Package from '../models/Package.js';

export const listPackages = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.city) filters.cityAvailability = req.query.city;
    if (req.query.theme) filters.theme = req.query.theme;
    if (req.query.budget) filters.startingPrice = { $lte: Number(req.query.budget) };
    const packages = await Package.find(filters);
    res.json({ packages });
  } catch (error) {
    next(error);
  }
};

export const createPackage = async (req, res, next) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json({ package: newPackage });
  } catch (error) {
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  try {
    const updated = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Package not found' });
    res.json({ package: updated });
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    const deleted = await Package.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (error) {
    next(error);
  }
};
