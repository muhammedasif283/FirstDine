import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function Navbar() {
  const { currentUser, logout } = useAppContext();
  const [navActive, setNavActive] = useState(false);
  const navigate = useNavigate();
  
  const isDark = document.body.classList.contains('dark-theme');

  const toggleTheme = () => {
    const isDarkNow = document.body.classList.toggle('dark-theme');
    document.documentElement.classList.toggle('dark-theme', isDarkNow);
    localStorage.setItem('firstdine_theme', isDarkNow ? 'dark' : 'light');
    setNavActive(false);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      setNavActive(false);
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <Link to="/" className="brand" onClick={() => setNavActive(false)}>
          <i className="ph-fill ph-fork-knife brand-icon"></i>
          <span className="brand-text">First<span className="brand-highlight">Dine</span></span>
        </Link>
        
        <button className="mobile-toggle" onClick={() => setNavActive(!navActive)} aria-label="Toggle navigation">
          <i className="ph ph-list"></i>
        </button>

        <div className={`nav-links ${navActive ? 'active' : ''}`}>
          <Link to="/" className="btn btn-ghost nav-item" onClick={() => setNavActive(false)}>Home</Link>
          <a href="/#restaurants" className="btn btn-ghost nav-item" onClick={() => setNavActive(false)}>Restaurants</a>
          
          <button className="btn btn-icon" onClick={toggleTheme} aria-label="Toggle Dark Mode" title="Toggle Dark Mode" style={{ marginRight: '10px' }}>
            <i className={isDark ? 'ph-bold ph-sun' : 'ph-bold ph-moon'} style={{ fontSize: '1.2rem' }}></i>
          </button>
          
          {currentUser ? (
             <div className="profile-dropdown-container">
               <div className="avatar-circle" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }} title="Profile Options">
                 <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{currentUser.name}</span>
                 <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=1E293B&color=fff`} alt="User" />
                 <i className="ph-bold ph-caret-down" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}></i>
               </div>
               <div className="profile-dropdown-menu">
                 <Link to="/reservations" className="dropdown-item" onClick={() => setNavActive(false)}><i className="ph ph-calendar-check" style={{ marginRight: '8px' }}></i> My Bookings</Link>
                 <button className="dropdown-item" style={{ color: '#EF4444' }} onClick={handleLogout}><i className="ph ph-sign-out" style={{ marginRight: '8px' }}></i> Logout</button>
               </div>
             </div>
          ) : (
             <Link to="/login" className="btn btn-primary" onClick={() => setNavActive(false)}>Login / Sign Up</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
