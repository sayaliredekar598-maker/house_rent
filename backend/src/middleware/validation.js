import { body, param, query } from 'express-validator';

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().trim(),
  body('role').optional().isIn(['user', 'owner', 'admin']),
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const propertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('type').optional().isIn(['apartment', 'house', 'villa', 'studio', 'room']),
  body('address').optional().isObject(),
  body('address.city').optional().trim(),
  body('address.street').optional().trim(),
  body('address.state').optional().trim(),
  body('address.pincode').optional().trim(),
  body('rent').isNumeric().withMessage('Rent must be a number').custom((v) => v >= 0).withMessage('Rent cannot be negative'),
  body('bedrooms').optional().isInt({ min: 0 }),
  body('bathrooms').optional().isInt({ min: 0 }),
  body('area').optional().isInt({ min: 0 }),
  body('amenities').optional().isArray(),
  body('images').optional().isArray(),
  body('isAvailable').optional().isBoolean(),
];

export const propertyUpdateValidation = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim(),
  body('type').optional().isIn(['apartment', 'house', 'villa', 'studio', 'room']),
  body('address').optional().isObject(),
  body('address.city').optional().trim(),
  body('address.street').optional().trim(),
  body('address.state').optional().trim(),
  body('address.pincode').optional().trim(),
  body('rent').optional().isNumeric().custom((v) => v >= 0),
  body('bedrooms').optional().isInt({ min: 0 }),
  body('bathrooms').optional().isInt({ min: 0 }),
  body('area').optional().isInt({ min: 0 }),
  body('amenities').optional().isArray(),
  body('images').optional().isArray(),
  body('isAvailable').optional().isBoolean(),
];

export const idParamValidation = [
  param('id').isMongoId().withMessage('Invalid property ID'),
];
