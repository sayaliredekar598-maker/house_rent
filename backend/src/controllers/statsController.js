import Property from '../models/Property.js';

export const getStats = async (req, res, next) => {
  try {
    const [totalProperties, cities] = await Promise.all([
      Property.countDocuments({ isAvailable: true }),
      Property.distinct('address.city', { isAvailable: true }),
    ]);
    const totalCities = cities.filter(Boolean).length;
    res.json({
      success: true,
      data: {
        totalProperties,
        totalCities,
      },
    });
  } catch (err) {
    next(err);
  }
};
