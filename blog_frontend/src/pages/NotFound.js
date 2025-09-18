import React from 'react';
import { Link } from 'react-router-dom';

/**
// PUBLIC_INTERFACE
 * NotFound simple 404 page.
 */
function NotFound() {
  return (
    <div className="card elevated">
      <div className="card-body">
        <h2 style={{marginTop:0}}>Page not found</h2>
        <p className="meta">The page you are looking for doesn't exist.</p>
        <Link to="/" className="btn">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFound;
