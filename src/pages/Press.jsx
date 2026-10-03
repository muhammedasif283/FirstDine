import React from 'react';
import { Link } from 'react-router-dom';

function Press() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Press</h1>
      <p>Find the latest news and media coverage about FirstDine.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
    </div>
  );
}

export default Press;
