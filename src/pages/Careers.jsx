import React from 'react';
import { Link } from 'react-router-dom';

function Careers() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Careers</h1>
      <p>Join the FirstDine team and help shape the future of dining experiences.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
    </div>
  );
}

export default Careers;
