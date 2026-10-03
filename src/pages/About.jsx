import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>About Us</h1>
      <p>
        FirstDine is a premium food‑tech platform based in Kerala, built to eliminate dining wait times.
        Our mission is to provide a seamless, delightful experience for diners and restaurants alike.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
    </div>
  );
}

export default About;
