import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { statsAPI } from '../services/api';
import './Home.css';

export default function Home() {
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    statsAPI
      .get()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setStatsLoading(false));
  }, []);

  const totalListings = stats?.totalProperties ?? null;
  const totalCities = stats?.totalCities ?? null;

  return (
    <section className="hero">
      <div className="container hero-content">
        <h1 className="hero-title">
          Find Your Perfect <span className="highlight">Rental Home</span>
        </h1>
        <p className="hero-subtitle">
          Browse listings, filter by location and budget, and connect with property owners — all in one place.
        </p>
        <div className="hero-actions">
          <Link to="/properties">
            <button type="button" className="btn btn-primary btn-lg">Browse Properties</button>
          </Link>
          <Link to="/register">
            <button type="button" className="btn btn-ghost btn-lg">List Your Property</button>
          </Link>
        </div>
      </div>
      <div className="hero-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <span className="stat-value">
                {statsLoading ? '—' : totalListings != null ? totalListings.toLocaleString() : '—'}
              </span>
              <span className="stat-label">Listings</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {statsLoading ? '—' : totalCities != null ? totalCities.toLocaleString() : '—'}
              </span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
