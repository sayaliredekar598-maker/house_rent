import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { propertiesAPI } from '../services/api';
import Spinner from '../components/Spinner';
import './PropertyDetail.css';

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    propertiesAPI
      .getById(id)
      .then((res) => setProperty(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const formatPrice = (n) => (n != null ? `₹${Number(n).toLocaleString()}/month` : '—');

  if (loading) {
    return (
      <div className="container page-loading">
        <Spinner size="large" />
        <span>Loading property...</span>
      </div>
    );
  }
  if (error || !property) {
    return (
      <div className="container">
        <p className="error-msg">{error || 'Property not found.'}</p>
        <Link to="/properties">← Back to listings</Link>
      </div>
    );
  }

  const addr = property.address || {};
  const owner = property.owner || {};
  const addressLine = [addr.street, addr.city, addr.state, addr.pincode].filter(Boolean).join(', ');

  return (
    <div className="container property-detail">
      <Link to="/properties" className="back-link">← Back to listings</Link>

      <div className="property-detail-grid">
        <div className="property-detail-main">
          <div className="property-detail-images">
            {property.images?.length > 0 ? (
              property.images.map((src, i) => (
                <img key={i} src={src} alt={`${property.title} ${i + 1}`} />
              ))
            ) : (
              <div className="property-detail-image-placeholder" aria-hidden="true">
                <span className="placeholder-icon">⌂</span>
                <span className="placeholder-text">No image</span>
              </div>
            )}
          </div>
          <div className="card property-detail-body">
            <span className="badge">{property.type}</span>
            <h1>{property.title}</h1>
            <p className="property-rent-lg">{formatPrice(property.rent)}</p>
            <p className="property-location-lg">{addressLine || '—'}</p>
            <div className="property-meta-lg">
              <span>{property.bedrooms} Bedrooms</span>
              <span>{property.bathrooms} Bathrooms</span>
              {property.area && <span>{property.area} sqft</span>}
            </div>
            {property.amenities?.length > 0 && (
              <div className="amenities">
                <h3>Amenities</h3>
                <ul>
                  {property.amenities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
            {property.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{property.description}</p>
              </div>
            )}
          </div>
        </div>
        <aside className="property-detail-sidebar card">
          <h3>Contact Owner</h3>
          <p><strong>{owner.name}</strong></p>
          <p><a href={`mailto:${owner.email}`}>{owner.email}</a></p>
          {owner.phone && <p>{owner.phone}</p>}
        </aside>
      </div>
    </div>
  );
}
