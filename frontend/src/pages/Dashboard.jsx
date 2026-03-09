import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { propertiesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'apartment',
    'address.city': '',
    'address.street': '',
    rent: '',
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
  });
  const [amenityInput, setAmenityInput] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchMy = () => {
    propertiesAPI
      .myList()
      .then((res) => setProperties(res.data || []))
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMy();
  }, []);

  useEffect(() => {
    propertiesAPI
      .getTypes()
      .then((res) => {
        const list = res.data || [];
        setTypes(list);
        setForm((prev) => {
          if (list.length && !list.includes(prev.type)) return { ...prev, type: list[0] };
          return prev;
        });
      })
      .catch(() => setTypes([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev };
      if (name.startsWith('address.')) {
        const key = name.split('.')[1];
        next.address = { ...(prev.address || {}), [key]: value };
        return next;
      }
      next[name] = value;
      return next;
    });
  };

  const addAmenity = () => {
    const v = amenityInput.trim();
    if (!v) return;
    setForm((prev) => ({
      ...prev,
      amenities: [...(prev.amenities || []), v],
    }));
    setAmenityInput('');
  };

  const removeAmenity = (i) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, idx) => idx !== i),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description,
      type: form.type,
      address: form.address || { city: form['address.city'] || '' },
      rent: Number(form.rent),
      bedrooms: Number(form.bedrooms) || 1,
      bathrooms: Number(form.bathrooms) || 1,
      amenities: form.amenities || [],
    };
    if (!payload.address.city) payload.address.city = 'Not specified';
    try {
      await propertiesAPI.create(payload);
      setShowForm(false);
      setForm({ title: '', description: '', type: 'apartment', 'address.city': '', rent: '', bedrooms: 1, bathrooms: 1, amenities: [] });
      fetchMy();
    } catch (err) {
      setSubmitError(err.message || 'Failed to create');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this property?')) return;
    try {
      await propertiesAPI.delete(id);
      fetchMy();
    } catch (err) {
      alert(err.message);
    }
  };

  const formatPrice = (n) => (n != null ? `₹${Number(n).toLocaleString()}/mo` : '—');

  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>
      <p className="dashboard-welcome">Hello, {user?.name}. Manage your listings here.</p>

      <div className="dashboard-actions">
        <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Property'}
        </button>
      </div>

      {showForm && (
        <div className="card dashboard-form">
          <h2>Add New Property</h2>
          {submitError && <div className="auth-error">{submitError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={form.type} onChange={handleChange}>
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input name="address.city" value={form.address?.city || form['address.city']} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Street (optional)</label>
                <input name="address.street" value={form.address?.street} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Rent (₹)</label>
                <input type="number" name="rent" value={form.rent} onChange={handleChange} min="0" required />
              </div>
              <div className="form-group">
                <label>Bedrooms</label>
                <input type="number" name="bedrooms" value={form.bedrooms} onChange={handleChange} min="0" />
              </div>
              <div className="form-group">
                <label>Bathrooms</label>
                <input type="number" name="bathrooms" value={form.bathrooms} onChange={handleChange} min="0" />
              </div>
            </div>
            <div className="form-group">
              <label>Amenities (add one by one)</label>
              <div className="amenity-input">
                <input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} placeholder="e.g. Parking" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())} />
                <button type="button" className="btn btn-ghost" onClick={addAmenity}>Add</button>
              </div>
              {form.amenities?.length > 0 && (
                <ul className="amenity-list">
                  {form.amenities.map((a, i) => (
                    <li key={i}>{a} <button type="button" className="amenity-remove" onClick={() => removeAmenity(i)}>×</button></li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Create Property'}</button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="page-loading">
          <Spinner size="large" />
          <span>Loading your properties...</span>
        </div>
      ) : properties.length === 0 ? (
        <p className="empty">You have no listings yet. Click &quot;Add Property&quot; to create one.</p>
      ) : (
        <div className="dashboard-list">
          {properties.map((p) => (
            <div key={p._id} className="card dashboard-item">
              <div className="dashboard-item-main">
                <span className="badge">{p.type}</span>
                <h3>{p.title}</h3>
                <p className="dashboard-item-location">{p.address?.city}</p>
                <p className="dashboard-item-rent">{formatPrice(p.rent)}</p>
              </div>
              <div className="dashboard-item-actions">
                <Link to={`/properties/${p._id}`} className="btn btn-ghost">View</Link>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
