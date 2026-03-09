import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertiesAPI } from '../services/api';
import Spinner from '../components/Spinner';
import './Properties.css';

export default function Properties() {
  const [data, setData] = useState({ data: [], pagination: {} });
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    minRent: '',
    maxRent: '',
    bedrooms: '',
    search: '',
    page: 1,
  });

  useEffect(() => {
    propertiesAPI
      .getTypes()
      .then((res) => setTypes(res.data || []))
      .catch(() => setTypes([]));
  }, []);

  const fetchList = async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
      const res = await propertiesAPI.list(params);
      setData({ data: res.data, pagination: res.pagination || {} });
    } catch (err) {
      setData({ data: [], pagination: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [filters.page]);

  const handleFilter = (e) => {
    e.preventDefault();
    setFilters((f) => ({ ...f, page: 1 }));
    fetchList();
  };

  const formatPrice = (n) => (n != null ? `₹${Number(n).toLocaleString()}/mo` : '—');

  return (
    <div className="container">
      <h1 className="page-title">Browse Properties</h1>

      <form className="filters card" onSubmit={handleFilter}>
        <div className="filters-grid">
          <div className="form-group">
            <label>Search / City</label>
            <input
              type="text"
              placeholder="City or keyword"
              value={filters.search || filters.city}
              onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value, city: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
            >
              <option value="">All</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Min Rent (₹)</label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={filters.minRent}
              onChange={(e) => setFilters((f) => ({ ...f, minRent: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Max Rent (₹)</label>
            <input
              type="number"
              min="0"
              placeholder="Any"
              value={filters.maxRent}
              onChange={(e) => setFilters((f) => ({ ...f, maxRent: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Bedrooms (min)</label>
            <input
              type="number"
              min="0"
              placeholder="Any"
              value={filters.bedrooms}
              onChange={(e) => setFilters((f) => ({ ...f, bedrooms: e.target.value }))}
            />
          </div>
          <div className="form-group filters-actions">
            <button type="submit" className="btn btn-primary">Apply</button>
          </div>
        </div>
      </form>

      {loading ? (
        <div className="page-loading">
          <Spinner size="large" />
          <span>Loading properties...</span>
        </div>
      ) : data.data.length === 0 ? (
        <p className="empty">No properties found. Try adjusting filters or add a new listing.</p>
      ) : (
        <>
          <div className="properties-grid">
            {data.data.map((p) => (
              <Link to={`/properties/${p._id}`} key={p._id} className="property-card card">
                <div className="property-image">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.title} />
                  ) : (
                    <div className="property-image-placeholder" aria-hidden="true">
                      <span className="placeholder-icon">⌂</span>
                    </div>
                  )}
                </div>
                <div className="property-body">
                  <span className="badge">{p.type}</span>
                  <h3>{p.title}</h3>
                  <p className="property-location">{p.address?.city || '—'}</p>
                  <div className="property-meta">
                    <span>{p.bedrooms} Beds</span>
                    <span>{p.bathrooms} Baths</span>
                    {p.area && <span>{p.area} sqft</span>}
                  </div>
                  <p className="property-rent">{formatPrice(p.rent)}</p>
                </div>
              </Link>
            ))}
          </div>
          {data.pagination?.pages > 1 && (
            <div className="pagination">
              <button
                type="button"
                className="btn btn-ghost"
                disabled={filters.page <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
              >
                Previous
              </button>
              <span>Page {data.pagination.page} of {data.pagination.pages}</span>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={filters.page >= data.pagination.pages}
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
