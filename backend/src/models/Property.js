import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'villa', 'studio', 'room'],
      default: 'apartment',
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, trim: true },
      pincode: { type: String, trim: true },
    },
    rent: {
      type: Number,
      required: [true, 'Rent amount is required'],
      min: 0,
    },
    bedrooms: {
      type: Number,
      default: 1,
      min: 0,
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: 0,
    },
    area: {
      type: Number,
      min: 0,
      default: null,
    },
    amenities: [{
      type: String,
      trim: true,
    }],
    images: [{
      type: String,
      trim: true,
    }],
    isAvailable: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

propertySchema.index({ title: 'text', description: 'text', 'address.city': 'text' });
propertySchema.index({ rent: 1, type: 1, 'address.city': 1 });

export default mongoose.model('Property', propertySchema);
