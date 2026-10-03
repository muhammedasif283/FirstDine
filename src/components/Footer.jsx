import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content reveal active">
        <div className="footer-brand">
          <div className="brand">
            <i className="ph-fill ph-fork-knife brand-icon"></i>
            <span className="brand-text">First<span className="brand-highlight">Dine</span></span>
          </div>
          <p className="mt-4 text-secondary">Experience the future of dining. Seamlessly discover, pre-book, and dine completely without the wait.</p>
          <div className="social-links mt-4">
            <a href="#" className="btn-icon"><i className="ph-fill ph-instagram-logo"></i></a>
            <a href="#" className="btn-icon"><i className="ph-fill ph-twitter-logo"></i></a>
            <a href="#" className="btn-icon"><i className="ph-fill ph-facebook-logo"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/press">Press</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="footer-section">
          <h4>For Diners</h4>
          <Link to="/">Explore</Link>
          <Link to="/reservations">Reservations</Link>
          <Link to="#">Gift Cards</Link>
          <Link to="#">Help Center</Link>
        </div>
        <div className="footer-section">
          <h4>For Restaurants</h4>
          <Link to="#">Partner with Us</Link>
          <Link to="/dashboard">Restaurant Dashboard</Link>
          <Link to="#">FirstDine Pro</Link>
        </div>
      </div>
      <div className="container footer-bottom reveal active" style={{ transitionDelay: '0.2s' }}>
        <p>&copy; 2026 FirstDine. All rights reserved.</p>
        <div className="legal-links">
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
