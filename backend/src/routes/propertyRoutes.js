import express from 'express';
import {
  getPropertyTypes,
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
} from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';
import { propertyValidation, propertyUpdateValidation, idParamValidation } from '../middleware/validation.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/types', getPropertyTypes);
router.get('/', getProperties);
router.get('/my', protect, getMyProperties);
router.get('/:id', idParamValidation, validate, getPropertyById);
router.post('/', protect, propertyValidation, validate, createProperty);
router.put('/:id', protect, idParamValidation, validate, propertyUpdateValidation, validate, updateProperty);
router.delete('/:id', protect, idParamValidation, validate, deleteProperty);

export default router;
