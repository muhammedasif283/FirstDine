import React from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>Blog</h1>
      <p>Stay updated with the latest stories, features, and insights from FirstDine.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
    </div>
  );
}

export default Blog;
