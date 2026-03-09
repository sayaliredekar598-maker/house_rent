import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">HouseRent</span>
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            {user ? (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <span className="user-name">{user.name}</span>
                <button type="button" className="btn btn-ghost" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">
                  <button type="button" className="btn btn-primary">Sign Up</button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>House Rent System — MCA Final Year Project. Node.js, React, MongoDB.</p>
        </div>
      </footer>
    </div>
  );
}
