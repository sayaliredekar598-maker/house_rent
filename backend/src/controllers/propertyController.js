import Property from '../models/Property.js';
import { AppError } from '../middleware/errorHandler.js';

export const getPropertyTypes = async (req, res, next) => {
  try {
    const types = Property.schema.path('type').enumValues || [];
    res.json({ success: true, data: types });
  } catch (err) {
    next(err);
  }
};

export const getProperties = async (req, res, next) => {
  try {
    const { city, type, minRent, maxRent, bedrooms, search, page = 1, limit = 10 } = req.query;
    const query = { isAvailable: true };

    if (city) query['address.city'] = new RegExp(city, 'i');
    if (type) query.type = type;
    if (bedrooms != null) query.bedrooms = { $gte: Number(bedrooms) };

    if (minRent != null || maxRent != null) {
      query.rent = {};
      if (minRent != null) query.rent.$gte = Number(minRent);
      if (maxRent != null) query.rent.$lte = Number(maxRent);
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { 'address.city': new RegExp(search, 'i') },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [properties, total] = await Promise.all([
      Property.find(query).populate('owner', 'name email phone').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Property.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: properties,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (err) {
    next(err);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email phone');
    if (!property) throw new AppError('Property not found', 404);
    res.json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const property = await Property.create({ ...req.body, owner: req.user._id });
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) throw new AppError('Property not found', 404);
    if (property.owner.toString() !== req.user._id.toString()) {
      throw new AppError('Not authorized to update this property', 403);
    }
    property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: property });
  } catch (err) {
    next(err);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) throw new AppError('Property not found', 404);
    if (property.owner.toString() !== req.user._id.toString()) {
      throw new AppError('Not authorized to delete this property', 403);
    }
    await property.deleteOne();
    res.json({ success: true, message: 'Property removed' });
  } catch (err) {
    next(err);
  }
};

export const getMyProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: properties });
  } catch (err) {
    next(err);
  }
};
